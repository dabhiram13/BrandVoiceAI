import React from "react";
import { 
  Instagram, 
  Tag, 
  Mail, 
  FileText 
} from "lucide-react";
import { ContentType, contentTypes } from "@shared/schema";
import { motion } from "framer-motion";

interface ContentTypeSelectorProps {
  selectedType: ContentType;
  onChange: (type: ContentType) => void;
}

// Map of content types to their respective icons, labels and gradient colors
const contentTypeMap = {
  social_media: {
    icon: <Instagram className="h-5 w-5" />,
    label: "Social Media",
    gradient: "from-purple-500 to-pink-500",
    hoverGradient: "hover:from-purple-600 hover:to-pink-600",
    bgLight: "bg-purple-50"
  },
  product: {
    icon: <Tag className="h-5 w-5" />,
    label: "Product",
    gradient: "from-blue-500 to-cyan-400",
    hoverGradient: "hover:from-blue-600 hover:to-cyan-500",
    bgLight: "bg-blue-50"
  },
  email: {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    gradient: "from-amber-500 to-orange-400",
    hoverGradient: "hover:from-amber-600 hover:to-orange-500",
    bgLight: "bg-amber-50"
  },
  blog_post: {
    icon: <FileText className="h-5 w-5" />,
    label: "Blog Post",
    gradient: "from-emerald-500 to-green-400",
    hoverGradient: "hover:from-emerald-600 hover:to-green-500",
    bgLight: "bg-emerald-50"
  }
};

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ 
  selectedType, 
  onChange 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {contentTypes.map((type) => {
        // Define colors based on content type
        let borderColor, textColor, hoverBg;
        
        switch(type) {
          case 'social_media':
            borderColor = "border-purple-400";
            textColor = "text-purple-600";
            hoverBg = "hover:bg-purple-50";
            break;
          case 'product':
            borderColor = "border-blue-400";
            textColor = "text-blue-600";
            hoverBg = "hover:bg-blue-50";
            break;
          case 'email':
            borderColor = "border-amber-400";
            textColor = "text-amber-600";
            hoverBg = "hover:bg-amber-50";
            break;
          case 'blog_post':
            borderColor = "border-emerald-400";
            textColor = "text-emerald-600";
            hoverBg = "hover:bg-emerald-50";
            break;
          default:
            borderColor = "border-gray-300";
            textColor = "text-gray-700";
            hoverBg = "hover:bg-gray-50";
        }
        
        // Active state styling
        if (selectedType === type) {
          borderColor = borderColor.replace("400", "500");
          textColor = textColor.replace("600", "700");
          hoverBg = hoverBg.replace("50", "100");
        }
        
        return (
          <div key={type} className="relative overflow-hidden rounded-lg">
            <button
              onClick={() => onChange(type)}
              className={`
                group w-full relative flex flex-col items-center justify-center p-4 
                bg-white border-2 ${borderColor} rounded-lg transition-all duration-300 
                ${hoverBg} overflow-hidden
              `}
            >
              {/* Shine effect overlay */}
              <div className="absolute -left-[100px] w-16 h-full top-0 bg-white/40 transform rotate-[20deg] translate-x-[-120%] group-hover:translate-x-[400%] transition-all duration-700 ease-in-out"></div>
              
              {/* Wiggle animation on hover */}
              <div className="relative z-10 transform group-hover:animate-wiggle">
                <div className={`p-2 rounded-full mb-2 ${textColor}`}>
                  {contentTypeMap[type].icon}
                </div>
                <span className={`font-medium uppercase tracking-wide text-sm ${textColor}`}>
                  {contentTypeMap[type].label}
                </span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ContentTypeSelector;
