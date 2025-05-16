import React, { useState } from "react";
import { Copy, RotateCcw, Sparkles, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BrandVoice } from "@shared/schema";
import { BRAND_CHARACTERISTICS } from "@/context/brand-voice-context-simplified";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface TransformationCardProps {
  brand: BrandVoice;
  content: string;
  characteristics: string[];
  generationTime: number;
  onRegenerate?: () => void;
}

const TransformationCard: React.FC<TransformationCardProps> = ({
  brand,
  content,
  characteristics,
  generationTime,
  onRegenerate
}) => {
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const brandInfo = BRAND_CHARACTERISTICS[brand];
  
  // Get brand-specific styling
  const getBrandColors = (brand: BrandVoice) => {
    switch(brand) {
      case 'nike':
        return {
          textColor: 'text-nike',
          bgColor: 'bg-nike',
          bgGradient: 'bg-gradient-to-r from-nike to-nike/80',
          bgLight: 'bg-nike-5',
          borderColor: 'border-nike',
          shadow: 'shadow-[0_0_15px_rgba(255,0,0,0.15)]'
        };
      case 'apple':
        return {
          textColor: 'text-apple',
          bgColor: 'bg-apple',
          bgGradient: 'bg-gradient-to-r from-apple to-apple/80',
          bgLight: 'bg-apple-5',
          borderColor: 'border-apple',
          shadow: 'shadow-[0_0_15px_rgba(51,51,51,0.15)]'
        };
      case 'wendys':
        return {
          textColor: 'text-wendys',
          bgColor: 'bg-wendys',
          bgGradient: 'bg-gradient-to-r from-wendys to-wendys/80',
          bgLight: 'bg-wendys-5',
          borderColor: 'border-wendys',
          shadow: 'shadow-[0_0_15px_rgba(255,50,50,0.15)]'
        };
      case 'southwest':
        return {
          textColor: 'text-southwest',
          bgColor: 'bg-southwest',
          bgGradient: 'bg-gradient-to-r from-southwest to-southwest/80',
          bgLight: 'bg-southwest-5',
          borderColor: 'border-southwest',
          shadow: 'shadow-[0_0_15px_rgba(35,100,200,0.15)]'
        };
      default:
        return {
          textColor: 'text-primary',
          bgColor: 'bg-primary',
          bgGradient: 'bg-gradient-to-r from-primary to-primary/80',
          bgLight: 'bg-primary/5',
          borderColor: 'border-primary',
          shadow: 'shadow-md'
        };
    }
  };

  const brandColors = getBrandColors(brand);
  
  const copyToClipboard = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to your clipboard",
        duration: 2000
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard",
        variant: "destructive",
        duration: 2000
      });
    } finally {
      setTimeout(() => setIsCopying(false), 1000);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      setIsRegenerating(true);
      onRegenerate();
      setTimeout(() => setIsRegenerating(false), 1000);
    }
  };

  return (
    <motion.div 
      className={`overflow-hidden rounded-3xl border-0 shadow-xl transition-all bg-white ${isHighlighted ? 'shadow-2xl' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.01 }}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    >
      {/* Card Header */}
      <div className={`px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#FF7A00]/10`}>
            <div className={`w-4 h-4 rounded-full bg-[#FF7A00]`}></div>
          </div>
          <h3 className={`font-semibold ml-3 text-lg text-[#111827]`}>
            {brandInfo?.name || brand.charAt(0).toUpperCase() + brand.slice(1)}
          </h3>
        </div>
        <div className="flex space-x-2">
          {/* Copy button */}
          <motion.button 
            className="text-dark-medium hover:text-[#FF7A00] p-2 rounded-full hover:bg-[#FF7A00]/5 transition-colors"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
            whileTap={{ scale: 0.9 }}
          >
            <Copy className={`h-5 w-5 ${isCopying ? "text-[#FF7A00]" : ""}`} />
          </motion.button>
          
          {/* Regenerate button */}
          {onRegenerate && (
            <motion.button 
              className="text-dark-medium hover:text-[#FF7A00] p-2 rounded-full hover:bg-[#FF7A00]/5 transition-colors"
              onClick={handleRegenerate}
              aria-label="Regenerate transformation"
              whileTap={{ scale: 0.9 }}
            >
              <RotateCcw className={`h-5 w-5 ${isRegenerating ? "animate-spin text-[#FF7A00]" : ""}`} />
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="px-6 py-4">
        <p className="text-foreground whitespace-pre-line text-base leading-relaxed">{content}</p>
      </div>
      
      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="inline-flex items-center bg-[#FF7A00]/5 px-2 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-[#FF7A00] mr-2" />
            <span className="text-sm font-medium text-[#FF7A00]">Key Characteristics</span>
          </div>
          {characteristics.map((trait, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-gray-700 bg-gray-50 font-medium text-xs rounded-full border-gray-200 px-3"
            >
              {trait}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-xs text-dark-light">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-[#FF7A00]" />
          <span>Generated in {generationTime.toFixed(1)}s</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformationCard;
