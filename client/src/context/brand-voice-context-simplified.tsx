import React, { createContext, useState, useContext, ReactNode } from "react";
import { ContentType, BrandVoice } from "@shared/schema";

// Example default text
const DEFAULT_TEXT = "We've launched a new product that improves efficiency by 30%. It's designed with the user in mind and comes with multiple features that solve common problems. Try it today and see the difference it makes in your daily routine.";

// Example text for different content types
const EXAMPLE_TEXTS = {
  social_media: "We've launched a new product that improves efficiency by 30%. It's designed with the user in mind and comes with multiple features that solve common problems. Try it today!",
  product: "Our new product improves efficiency by 30%. Designed with the user in mind, it comes with multiple features that solve common problems. Try it today and see the difference it makes in your daily routine.",
  email: "Dear valued customer,\n\nWe're excited to announce our new product that improves efficiency by 30%. It's designed with you in mind and comes with multiple features that solve common problems you face every day.\n\nTry it today and see the difference it makes in your daily routine.",
  blog_post: "Today, we're thrilled to introduce our revolutionary new product that improves efficiency by 30%. In this post, we'll explore how it's designed with the user in mind and the multiple features that solve common problems. Read on to discover how it can transform your daily routine."
};

// Brand characteristics
export const BRAND_CHARACTERISTICS = {
  nike: {
    name: "Nike",
    description: "Motivational, direct, empowering language. Uses second-person \"you\" frequently with strong action verbs.",
    color: "nike"
  },
  apple: {
    name: "Apple",
    description: "Minimalist, elegant, emphasizes simplicity. Short sentences with powerful adjectives. Clean and precise language.",
    color: "apple"
  },
  wendys: {
    name: "Wendy's",
    description: "Sassy, humorous, conversational tone. Uses casual language with pop culture references and witty comebacks.",
    color: "wendys"
  },
  southwest: {
    name: "Southwest",
    description: "Friendly, warm, and conversational. Focuses on people and relationships with a hint of playfulness and heart.",
    color: "southwest"
  }
};

export interface TransformationResult {
  originalText: string;
  transformedText: string;
  brandVoice: BrandVoice;
  contentType: ContentType;
  characteristics: string[];
  generationTime: number;
}

interface BrandVoiceContextType {
  inputText: string;
  setInputText: (text: string) => void;
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  transformationResults: TransformationResult[];
  setTransformationResults: (results: TransformationResult[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadExample: () => void;
  clearText: () => void;
}

// Create context with a default value
const initialContextValue: BrandVoiceContextType = {
  inputText: DEFAULT_TEXT,
  setInputText: () => {},
  contentType: "social_media",
  setContentType: () => {},
  selectedTab: "all",
  setSelectedTab: () => {},
  transformationResults: [],
  setTransformationResults: () => {},
  isLoading: false,
  setIsLoading: () => {},
  loadExample: () => {},
  clearText: () => {}
};

// Create the context
export const BrandVoiceContext = createContext<BrandVoiceContextType>(initialContextValue);

// Provider component
export const BrandVoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputText, setInputText] = useState<string>(DEFAULT_TEXT);
  const [contentType, setContentType] = useState<ContentType>("social_media");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [transformationResults, setTransformationResults] = useState<TransformationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadExample = () => {
    setInputText(EXAMPLE_TEXTS[contentType]);
  };

  const clearText = () => {
    setInputText("");
  };

  // Create the value object with all context values
  const contextValue: BrandVoiceContextType = {
    inputText,
    setInputText,
    contentType,
    setContentType,
    selectedTab,
    setSelectedTab,
    transformationResults,
    setTransformationResults,
    isLoading,
    setIsLoading,
    loadExample,
    clearText
  };

  return (
    <BrandVoiceContext.Provider value={contextValue}>
      {children}
    </BrandVoiceContext.Provider>
  );
};

// Custom hook to use the context
export const useBrandVoice = () => {
  const context = useContext(BrandVoiceContext);
  return context;
};