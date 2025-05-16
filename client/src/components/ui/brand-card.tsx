import React from "react";
import { BrandVoice } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND_CHARACTERISTICS } from "@/context/brand-voice-context";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface BrandCardProps {
  brand: BrandVoice;
  onClick?: () => void;
  isSelected?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({ 
  brand, 
  onClick, 
  isSelected = false 
}) => {
  const brandInfo = BRAND_CHARACTERISTICS[brand];
  
  // Define brand-specific styles
  const getBrandColors = (brand: BrandVoice) => {
    switch(brand) {
      case 'nike':
        return {
          textColor: 'text-nike',
          bgColor: 'bg-nike',
          bgGradient: 'bg-gradient-to-br from-nike to-nike/80',
          bgLight: 'bg-nike-5',
          borderColor: 'border-nike',
          shadow: 'shadow-[0_0_15px_rgba(255,0,0,0.15)]'
        };
      case 'apple':
        return {
          textColor: 'text-apple',
          bgColor: 'bg-apple',
          bgGradient: 'bg-gradient-to-br from-apple to-apple/80',
          bgLight: 'bg-apple-5',
          borderColor: 'border-apple',
          shadow: 'shadow-[0_0_15px_rgba(51,51,51,0.15)]'
        };
      case 'wendys':
        return {
          textColor: 'text-wendys',
          bgColor: 'bg-wendys',
          bgGradient: 'bg-gradient-to-br from-wendys to-wendys/80',
          bgLight: 'bg-wendys-5',
          borderColor: 'border-wendys',
          shadow: 'shadow-[0_0_15px_rgba(255,50,50,0.15)]'
        };
      case 'southwest':
        return {
          textColor: 'text-southwest',
          bgColor: 'bg-southwest',
          bgGradient: 'bg-gradient-to-br from-southwest to-southwest/80',
          bgLight: 'bg-southwest-5',
          borderColor: 'border-southwest',
          shadow: 'shadow-[0_0_15px_rgba(35,100,200,0.15)]'
        };
      default:
        return {
          textColor: 'text-primary',
          bgColor: 'bg-primary',
          bgGradient: 'bg-gradient-to-br from-primary to-primary/80',
          bgLight: 'bg-primary/5',
          borderColor: 'border-primary',
          shadow: 'shadow-md'
        };
    }
  };
  
  const brandColors = getBrandColors(brand);
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${isSelected ? brandColors.shadow : ''}`}
    >
      <Card 
        className={`cursor-pointer rounded-xl overflow-hidden transition-all ${
          isSelected 
            ? `border-2 ${brandColors.borderColor} ${brandColors.shadow}` 
            : "border-transparent hover:border-gray-200"
        }`}
        onClick={onClick}
      >
        <div className={`h-1.5 w-full ${brandColors.bgGradient}`}></div>
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            <div className={`w-4 h-4 rounded-full ${brandColors.bgGradient}`}></div>
            <h4 className={`font-semibold text-lg ${brandColors.textColor}`}>
              {brandInfo.name}
            </h4>
          </div>
          
          <p className="text-sm text-dark-medium mb-4">{brandInfo.description}</p>
          
          <div className="flex flex-wrap gap-1.5">
            {brandInfo.characteristics.map((trait, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`${brandColors.textColor} ${brandColors.bgLight} font-medium transition-all hover:scale-105`}
              >
                {trait}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BrandCard;
