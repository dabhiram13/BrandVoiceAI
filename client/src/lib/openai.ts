import { apiRequest } from "./queryClient";
import { TransformationResponse, BrandVoice, ContentType } from "@shared/schema";

/**
 * Transform text using a specific brand voice
 */
export async function transformText(
  text: string,
  brandVoice: BrandVoice,
  contentType: ContentType
): Promise<TransformationResponse> {
  try {
    const response = await apiRequest("POST", "/api/transform", {
      text,
      brandVoice,
      contentType
    });
    
    return response.json();
  } catch (error) {
    console.error("Error transforming text:", error);
    throw new Error("Failed to transform text. Please try again.");
  }
}

/**
 * Transform text for all brand voices
 */
export async function transformAllVoices(
  text: string,
  contentType: ContentType
): Promise<TransformationResponse[]> {
  try {
    const response = await apiRequest("POST", "/api/transform-all", {
      text,
      contentType
    });
    
    const data = await response.json();
    return data.transformations;
  } catch (error) {
    console.error("Error transforming text for all voices:", error);
    throw new Error("Failed to transform text. Please try again.");
  }
}

/**
 * Get analytics data
 */
export async function getAnalytics() {
  try {
    const response = await apiRequest("GET", "/api/analytics", undefined);
    return response.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw new Error("Failed to fetch analytics. Please try again.");
  }
}
