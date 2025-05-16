import React from "react";
import { Lightbulb } from "lucide-react";

const PromptInsights: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Lightbulb className="text-accent-yellow mr-2 h-5 w-5" />
        Prompt Engineering Insights
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-base">Key Techniques Used</h4>
          <ul className="mt-2 space-y-2 text-sm text-dark-medium">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Character persona adoption</strong> - Creating a distinct brand personality for AI to embody</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Linguistic pattern matching</strong> - Identifying and reproducing stylistic patterns unique to each brand</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Content structure adaptation</strong> - Reformatting text based on typical brand presentation styles</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-base mb-2">Prompt Template Example</h4>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm font-mono text-dark-medium overflow-x-auto">
            <span className="text-primary">Transform the following text into {"{brand}"}'s voice.</span><br />
            <span className="text-dark-light">// Brand Voice Characteristics</span><br />
            <span className="text-accent-yellow">* Tone: {"{toneAttributes}"}</span><br />
            <span className="text-accent-yellow">* Style: {"{styleAttributes}"}</span><br />
            <span className="text-accent-yellow">* Vocabulary: {"{vocabularyPatterns}"}</span><br />
            <span className="text-dark-light">// Content Type: {"{contentType}"}</span><br />
            <span className="text-green-500">Original text: "{"{originalText}"}"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInsights;
