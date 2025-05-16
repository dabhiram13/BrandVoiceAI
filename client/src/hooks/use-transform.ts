import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  TransformationRequest, 
  TransformationResponse, 
  BrandVoice, 
  ContentType 
} from "@shared/schema";

// Hook for transforming text for a single brand voice
export function useTransform() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TransformationRequest): Promise<TransformationResponse> => {
      const response = await apiRequest("POST", "/api/transform", data);
      return response.json();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to transform text. Please try again.",
        variant: "destructive"
      });
    },
  });
}

// Hook for transforming text for all brand voices
export function useTransformAll() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      text, 
      contentType 
    }: { 
      text: string; 
      contentType: ContentType 
    }): Promise<{
      originalText: string;
      contentType: ContentType;
      transformations: TransformationResponse[];
    }> => {
      const response = await apiRequest("POST", "/api/transform-all", { text, contentType });
      return response.json();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to transform text. Please try again.",
        variant: "destructive"
      });
    },
  });
}

// Hook for regenerating a specific brand voice transformation
export function useRegenerateTransform(onSuccess?: (data: TransformationResponse) => void) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TransformationRequest): Promise<TransformationResponse> => {
      const response = await apiRequest("POST", "/api/transform", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to regenerate transformation. Please try again.",
        variant: "destructive"
      });
    },
  });
}
