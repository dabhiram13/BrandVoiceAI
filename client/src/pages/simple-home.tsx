import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wand2, Lightbulb, Copy, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BrandVoice, ContentType } from "@shared/schema";

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
const BRAND_CHARACTERISTICS = {
  nike: {
    name: "Nike",
    description: "Motivational, direct, empowering language. Uses second-person \"you\" frequently with strong action verbs.",
    color: "nike",
    characteristics: ["Motivational", "Action-Oriented", "Empowering"]
  },
  apple: {
    name: "Apple",
    description: "Minimalist, elegant, emphasizes simplicity. Short sentences with powerful adjectives. Clean and precise language.",
    color: "apple",
    characteristics: ["Minimalist", "Elegant", "Simple"]
  },
  wendys: {
    name: "Wendy's",
    description: "Sassy, humorous, conversational tone. Uses casual language with pop culture references and witty comebacks.",
    color: "wendys",
    characteristics: ["Sassy", "Humorous", "Conversational"]
  },
  southwest: {
    name: "Southwest",
    description: "Friendly, warm, and conversational. Focuses on people and relationships with a hint of playfulness and heart.",
    color: "southwest",
    characteristics: ["Friendly", "Warm", "Conversational"]
  }
};

// Mock transformations for demonstration
const generateMockTransformation = (text: string, brand: BrandVoice, contentType: ContentType) => {
  let result = "";
  
  switch(brand) {
    case "nike":
      result = "JUST DO IT. Our revolutionary product boosts YOUR efficiency by 30%. DESIGNED with YOU in mind, it EMPOWERS your daily routine with multiple problem-solving features. TAKE ACTION today!";
      break;
    case "apple":
      result = "Efficiency. Reimagined.\n\nIntroducing our new product. 30% more efficient. Beautifully designed. Intuitive features. Simply amazing.";
      break;
    case "wendys":
      result = "We didn't just drop a new product, we dropped the mic on inefficiency. 😎 Our new product is 30% more efficient than whatever you're using now (yeah, we went there). Try it today... or don't, but you'll be missing out. #SorryNotSorry";
      break;
    case "southwest":
      result = "We're so excited to share our hearts with you! ❤️ Our new product was created with YOU in mind, bringing 30% more efficiency to your day. We'd love for you to try it and become part of our family of happy customers!";
      break;
    default:
      result = text;
  }
  
  return {
    originalText: text,
    transformedText: result,
    brandVoice: brand,
    contentType,
    characteristics: BRAND_CHARACTERISTICS[brand].characteristics,
    generationTime: 1.2
  };
};

// ContentTypeSelector component
const ContentTypeSelector = ({ selectedType, onChange }) => {
  const contentTypes = ["social_media", "product", "email", "blog_post"];
  
  // Map of content types to their respective icons and labels
  const contentTypeMap = {
    social_media: {
      icon: <span className="mr-2">📱</span>,
      label: "Social Media"
    },
    product: {
      icon: <span className="mr-2">🏷️</span>,
      label: "Product"
    },
    email: {
      icon: <span className="mr-2">📧</span>,
      label: "Email"
    },
    blog_post: {
      icon: <span className="mr-2">📝</span>,
      label: "Blog Post"
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {contentTypes.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`py-2 px-3 ${
            selectedType === type
              ? "bg-primary bg-opacity-10 text-primary"
              : "bg-gray-100 text-dark-medium hover:bg-gray-200"
          } rounded-md text-sm font-medium flex items-center justify-center transition-colors`}
        >
          {contentTypeMap[type].icon}
          {contentTypeMap[type].label}
        </button>
      ))}
    </div>
  );
};

// TransformationCard component
const TransformationCard = ({ brand, content, characteristics, generationTime, onRegenerate }) => {
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const brandInfo = BRAND_CHARACTERISTICS[brand];
  
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

  const getBrandClasses = (brand) => {
    switch(brand) {
      case 'nike': return { bg: 'bg-nike-5', border: 'border-nike', text: 'text-nike' };
      case 'apple': return { bg: 'bg-apple-5', border: 'border-apple', text: 'text-apple' };
      case 'wendys': return { bg: 'bg-wendys-5', border: 'border-wendys', text: 'text-wendys' };
      case 'southwest': return { bg: 'bg-southwest-5', border: 'border-southwest', text: 'text-southwest' };
      default: return { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800' };
    }
  };

  const classes = getBrandClasses(brand);

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className={`${classes.bg} px-4 py-3 flex justify-between items-center`}>
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full ${classes.border}`}></span>
          <h3 className={`font-semibold ml-2 ${classes.text}`}>
            {brandInfo?.name || brand.charAt(0).toUpperCase() + brand.slice(1)}
          </h3>
        </div>
        <div className="flex space-x-2">
          {/* Copy button */}
          <button 
            className="text-dark-medium hover:text-dark p-1 rounded"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
          >
            <Copy className={`h-4 w-4 ${isCopying ? "text-primary" : ""}`} />
          </button>
          
          {/* Regenerate button */}
          {onRegenerate && (
            <button 
              className="text-dark-medium hover:text-dark p-1 rounded"
              onClick={handleRegenerate}
              aria-label="Regenerate transformation"
            >
              <RotateCcw className={`h-4 w-4 ${isRegenerating ? "animate-spin text-primary" : ""}`} />
            </button>
          )}
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4 bg-white">
        <p className="text-dark whitespace-pre-line">{content}</p>
      </div>
      
      {/* Card Footer */}
      <div className="bg-gray-50 px-4 py-2 text-xs text-dark-light flex justify-between">
        <span>Characteristics: {characteristics.join(", ")}</span>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span>Generated in {generationTime.toFixed(1)}s</span>
        </div>
      </div>
    </div>
  );
};

// BrandVoiceAnalysis component
const BrandVoiceAnalysis = () => {
  return (
    <div className="space-y-4">
      {Object.entries(BRAND_CHARACTERISTICS).map(([key, brand]) => {
        const classes = (() => {
          switch(key) {
            case 'nike': return { border: 'border-nike', bg: 'bg-nike' };
            case 'apple': return { border: 'border-apple', bg: 'bg-apple' };
            case 'wendys': return { border: 'border-wendys', bg: 'bg-wendys' };
            case 'southwest': return { border: 'border-southwest', bg: 'bg-southwest' };
            default: return { border: 'border-gray-300', bg: 'bg-gray-400' };
          }
        })();
        
        return (
          <div key={key} className={`border-l-4 ${classes.border} pl-4 py-1`}>
            <h4 className="font-medium text-base flex items-center">
              <span className={`w-3 h-3 rounded-full ${classes.bg} mr-2`}></span>
              {brand.name}
            </h4>
            <p className="text-sm text-dark-medium mt-1">{brand.description}</p>
          </div>
        );
      })}
    </div>
  );
};

// PromptInsights component
const PromptInsights = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Lightbulb className="text-yellow-500 mr-2 h-5 w-5" />
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
            <span className="text-gray-400">// Brand Voice Characteristics</span><br />
            <span className="text-yellow-500">* Tone: {"{toneAttributes}"}</span><br />
            <span className="text-yellow-500">* Style: {"{styleAttributes}"}</span><br />
            <span className="text-yellow-500">* Vocabulary: {"{vocabularyPatterns}"}</span><br />
            <span className="text-gray-400">// Content Type: {"{contentType}"}</span><br />
            <span className="text-green-500">Original text: "{"{originalText}"}"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimpleHome: React.FC = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState<string>(DEFAULT_TEXT);
  const [contentType, setContentType] = useState<ContentType>("social_media");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [transformationResults, setTransformationResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get word count from input text
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Handle transform all function
  const handleTransformAll = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Generate sample transformations for demonstration
      const sampleResults = [
        generateMockTransformation(inputText, "nike", contentType),
        generateMockTransformation(inputText, "apple", contentType),
        generateMockTransformation(inputText, "wendys", contentType),
        generateMockTransformation(inputText, "southwest", contentType)
      ];
      
      setTimeout(() => {
        setTransformationResults(sampleResults);
        setSelectedTab("all");
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Transform error:", error);
      toast({
        title: "Error transforming text",
        description: "There was a problem transforming your text. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Filter results based on selected tab
  const filteredResults = selectedTab === "all" 
    ? transformationResults 
    : transformationResults.filter(result => result.brandVoice === selectedTab);

  // Handle regenerate for a specific brand
  const handleRegenerate = (brandVoice: BrandVoice) => {
    const newTransformation = generateMockTransformation(inputText, brandVoice, contentType);
    
    setTransformationResults(prevResults => 
      prevResults.map(result => 
        result.brandVoice === brandVoice ? newTransformation : result
      )
    );
  };
  
  // Example text loader
  const loadExample = () => {
    setInputText(EXAMPLE_TEXTS[contentType]);
  };
  
  // Clear text
  const clearText = () => {
    setInputText("");
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="text-center mb-16 pt-6">
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF7A00] to-[#FF5412] rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15l2 2 4-4M7 8h6M7 12h3"/>
              <rect width="18" height="18" x="3" y="3" rx="2"/>
            </svg>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full text-sm font-medium text-[#FF7A00] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00]"></span>
          Smart AI Features
        </div>
        <h1 className="rainbow-text text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl mx-auto">
          Perfect Brand Voice
          <br />
          for Extraordinary Impact
        </h1>
        <p className="text-dark-medium/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Enhance your content with intelligent AI brand voice magic for superior recognition and connection.
        </p>
      </div>

      {/* Main Transform Interface - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
        {/* Left Column - Input */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-0 rounded-3xl shadow-xl bg-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-5 flex items-center">
                <span className="bg-[#FF7A00]/10 p-2 rounded-full text-[#FF7A00] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                </span>
                Original Content
              </h3>
              
              {/* Content Type Selection */}
              <div className="mb-6">
                <label className="block text-dark-medium text-sm font-medium mb-3">Select Content Type</label>
                <ContentTypeSelector
                  selectedType={contentType}
                  onChange={setContentType}
                />
              </div>
              
              {/* Input Text Area */}
              <div className="mb-4">
                <label htmlFor="original-content" className="block text-dark-medium text-sm font-medium mb-2">
                  Your Generic Text
                </label>
                <Textarea
                  id="original-content"
                  rows={8}
                  className="w-full resize-none text-base border border-gray-200 rounded-xl p-4 focus:ring-primary"
                  placeholder="Enter your generic content here to transform it into brand-specific voice..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex justify-between text-xs font-medium mt-2">
                  <span className="bg-secondary py-1 px-3 rounded-full text-dark-medium">Word count: {wordCount}</span>
                  <button 
                    className="text-primary hover:text-blue-700"
                    onClick={clearText}
                  >
                    Clear text
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <button 
                  onClick={handleTransformAll}
                  disabled={isLoading || !inputText.trim()}
                  className={`uiverse-button w-full py-4 ${(isLoading || !inputText.trim()) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transforming Content...
                    </>
                  ) : (
                    <>
                      Transform Into Brand Voices
                      <svg
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                          className="fill-gray-800 group-hover:fill-gray-800"
                        ></path>
                      </svg>
                    </>
                  )}
                </button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={loadExample}
                    className="flex-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Load Example
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearText}
                    className="flex-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Text
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Voice Analysis Card */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Brand Voice Analysis</h3>
              <BrandVoiceAnalysis />
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Transformed Output */}
        <div className="lg:col-span-3">
          <Card>
            {/* Tabs for brand voices */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full border-b rounded-none grid grid-cols-5">
                <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  All Results
                </TabsTrigger>
                <TabsTrigger value="nike" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-nike">
                  Nike
                </TabsTrigger>
                <TabsTrigger value="apple" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-apple">
                  Apple
                </TabsTrigger>
                <TabsTrigger value="wendys" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-wendys">
                  Wendy's
                </TabsTrigger>
                <TabsTrigger value="southwest" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-southwest">
                  Southwest
                </TabsTrigger>
              </TabsList>
              
              {/* Transformation Cards Container */}
              <div className="p-4 grid grid-cols-1 gap-4">
                {isLoading ? (
                  <>
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                    <p className="text-center text-dark-medium">Transforming your content into brand voices...</p>
                  </>
                ) : transformationResults.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-dark-medium">No transformations yet</h3>
                    <p className="text-dark-light mt-2">Enter your text and click "Transform All Voices" to get started.</p>
                  </div>
                ) : (
                  filteredResults.map((result) => (
                    <TransformationCard
                      key={result.brandVoice}
                      brand={result.brandVoice}
                      content={result.transformedText}
                      characteristics={result.characteristics}
                      generationTime={result.generationTime}
                      onRegenerate={() => handleRegenerate(result.brandVoice)}
                    />
                  ))
                )}
              </div>
            </Tabs>
          </Card>
          
          {/* Prompt Insights Panel */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <PromptInsights />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SimpleHome;