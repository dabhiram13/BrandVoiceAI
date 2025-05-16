import React from "react";
import { BRAND_CHARACTERISTICS } from "@/context/brand-voice-context-simplified";

const BrandVoiceAnalysis: React.FC = () => {
  return (
    <div className="space-y-4">
      {Object.entries(BRAND_CHARACTERISTICS).map(([key, brand]) => (
        <div key={key} className={`border-l-4 ${
          key === 'nike' ? 'border-nike' :
          key === 'apple' ? 'border-apple' :
          key === 'wendys' ? 'border-wendys' :
          'border-southwest'
        } pl-4 py-1`}>
          <h4 className="font-medium text-base flex items-center">
            <span className={`w-3 h-3 rounded-full ${
              key === 'nike' ? 'bg-nike' :
              key === 'apple' ? 'bg-apple' :
              key === 'wendys' ? 'bg-wendys' :
              'bg-southwest'
            } mr-2`}></span>
            {brand.name}
          </h4>
          <p className="text-sm text-dark-medium mt-1">{brand.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BrandVoiceAnalysis;
