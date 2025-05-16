import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table from the original schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Content types for brand voice transformations
export const contentTypes = ["social_media", "product", "email", "blog_post"] as const;
export type ContentType = typeof contentTypes[number];

// Brand voices
export const brandVoices = ["nike", "apple", "wendys", "southwest"] as const;
export type BrandVoice = typeof brandVoices[number];

// Transformation schema
export const transformations = pgTable("transformations", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  brandVoice: text("brand_voice").notNull(),
  contentType: text("content_type").notNull(),
  transformedText: text("transformed_text").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertTransformationSchema = createInsertSchema(transformations).pick({
  originalText: true,
  brandVoice: true,
  contentType: true,
  transformedText: true,
  createdAt: true,
});

export type InsertTransformation = z.infer<typeof insertTransformationSchema>;
export type Transformation = typeof transformations.$inferSelect;

// Analytics schema
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  brandVoice: text("brand_voice").notNull(),
  contentType: text("content_type").notNull(),
  count: integer("count").notNull().default(1),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  brandVoice: true,
  contentType: true,
  count: true,
});

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;

// Request and response types for transformation API
export const transformationRequestSchema = z.object({
  text: z.string().min(1, "Please enter some text to transform"),
  brandVoice: z.enum(brandVoices),
  contentType: z.enum(contentTypes),
});

export type TransformationRequest = z.infer<typeof transformationRequestSchema>;

export const transformationResponseSchema = z.object({
  originalText: z.string(),
  transformedText: z.string(),
  brandVoice: z.enum(brandVoices),
  contentType: z.enum(contentTypes),
  characteristics: z.array(z.string()),
  generationTime: z.number()
});

export type TransformationResponse = z.infer<typeof transformationResponseSchema>;
