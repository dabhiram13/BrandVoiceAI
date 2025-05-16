import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { transformationRequestSchema, transformationResponseSchema } from "@shared/schema";
import OpenAI from "openai";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-default-key-for-development"
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to transform text based on brand voice
  app.post("/api/transform", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const payload = transformationRequestSchema.parse(req.body);
      const { text, brandVoice, contentType } = payload;
      
      const startTime = Date.now();
      
      // Generate transformation
      const transformation = await generateTransformation(text, brandVoice, contentType);
      
      // Calculate generation time
      const generationTime = (Date.now() - startTime) / 1000;
      
      // Store analytics
      await storage.incrementAnalytics(brandVoice, contentType);
      
      // Store transformation
      await storage.createTransformation({
        originalText: text,
        brandVoice,
        contentType,
        transformedText: transformation.transformedText,
        createdAt: new Date().toISOString()
      });
      
      // Return response
      res.status(200).json({
        ...transformation,
        generationTime
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error transforming text:", error);
        res.status(500).json({ message: "Failed to transform text" });
      }
    }
  });

  // API endpoint to transform text for all brand voices
  app.post("/api/transform-all", async (req: Request, res: Response) => {
    try {
      // Validate request
      const { text, contentType } = req.body;
      
      if (!text || typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({ message: "Text is required" });
      }
      
      if (!contentType || !["social_media", "product", "email", "blog_post"].includes(contentType)) {
        return res.status(400).json({ message: "Valid content type is required" });
      }
      
      // Generate transformations for all brand voices
      const startTime = Date.now();
      const results = await Promise.all([
        generateTransformation(text, "nike", contentType),
        generateTransformation(text, "apple", contentType),
        generateTransformation(text, "wendys", contentType),
        generateTransformation(text, "southwest", contentType)
      ]);
      
      // Calculate generation times
      const generationTime = (Date.now() - startTime) / 1000;
      
      // Store analytics for each brand voice
      await Promise.all([
        storage.incrementAnalytics("nike", contentType),
        storage.incrementAnalytics("apple", contentType),
        storage.incrementAnalytics("wendys", contentType),
        storage.incrementAnalytics("southwest", contentType)
      ]);
      
      // Store transformations
      await Promise.all(results.map(result => 
        storage.createTransformation({
          originalText: text,
          brandVoice: result.brandVoice,
          contentType,
          transformedText: result.transformedText,
          createdAt: new Date().toISOString()
        })
      ));
      
      // Return response with all transformations
      res.status(200).json({
        originalText: text,
        contentType,
        transformations: results.map(result => ({
          ...result,
          generationTime: generationTime / 4 // Divide by number of transformations for average time
        }))
      });
    } catch (error) {
      console.error("Error transforming text for all brand voices:", error);
      res.status(500).json({ message: "Failed to transform text for all brand voices" });
    }
  });

  // API endpoint to get analytics
  app.get("/api/analytics", async (_req: Request, res: Response) => {
    try {
      const analytics = await storage.getAnalytics();
      const popularBrandVoices = await storage.getPopularBrandVoices();
      const popularContentTypes = await storage.getPopularContentTypes();
      
      res.status(200).json({
        analytics,
        popularBrandVoices,
        popularContentTypes
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate transformations using OpenAI
async function generateTransformation(
  text: string, 
  brandVoice: string, 
  contentType: string
): Promise<{
  originalText: string;
  transformedText: string;
  brandVoice: string;
  contentType: string;
  characteristics: string[];
}> {
  // Define brand characteristics and prompt templates
  const brandCharacteristics: Record<string, { tone: string; style: string; vocabulary: string; characteristics: string[] }> = {
    nike: {
      tone: "motivational, direct, empowering",
      style: "action-oriented, bold, inspirational",
      vocabulary: "dynamic verbs, second-person 'you', capitalized emphasis",
      characteristics: ["Motivational", "Action-Oriented", "Empowering"]
    },
    apple: {
      tone: "minimalist, elegant, confident",
      style: "clean, precise, sophisticated",
      vocabulary: "simple words, short sentences, powerful adjectives",
      characteristics: ["Minimalist", "Elegant", "Simple"]
    },
    wendys: {
      tone: "sassy, humorous, irreverent",
      style: "conversational, witty, slightly sarcastic",
      vocabulary: "casual language, pop culture references, emojis",
      characteristics: ["Sassy", "Humorous", "Conversational"]
    },
    southwest: {
      tone: "friendly, warm, welcoming",
      style: "conversational, genuine, heartfelt",
      vocabulary: "people-focused terms, relational language, heart symbols",
      characteristics: ["Friendly", "Warm", "Conversational"]
    }
  };

  // Convert content type to readable format
  const contentTypeFormatted = contentType.replace("_", " ");
  
  // Get the brand info
  const brand = brandCharacteristics[brandVoice];
  
  // Create prompt for OpenAI
  const prompt = `Transform the following text into ${brandVoice.charAt(0).toUpperCase() + brandVoice.slice(1)}'s voice.

Brand Voice Characteristics:
* Tone: ${brand.tone}
* Style: ${brand.style}
* Vocabulary: ${brand.vocabulary}

Content Type: ${contentTypeFormatted}

Original text: "${text}"

Respond with ONLY the transformed text, nothing else. Be concise but maintain the key information from the original text.`;

  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const transformedText = response.choices[0].message.content?.trim() || "Error: No response generated";

    return {
      originalText: text,
      transformedText,
      brandVoice,
      contentType,
      characteristics: brand.characteristics
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate transformation");
  }
}
