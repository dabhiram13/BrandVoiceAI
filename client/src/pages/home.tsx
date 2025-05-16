import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Wand2 } from "lucide-react";
import ContentTypeSelector from "@/components/ui/content-type-selector";
import TransformationCard from "@/components/ui/transformation-card";
import BrandVoiceAnalysis from "@/components/ui/brand-voice-analysis";
import PromptInsights from "@/components/ui/prompt-insights";
import { useTransformAll, useRegenerateTransform } from "@/hooks/use-transform";
import { useBrandVoice } from "@/context/brand-voice-context-simplified";
import { BrandVoice, ContentType } from "@shared/schema";

const Home: React.FC = () => {
  const { 
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
  } = useBrandVoice();

  // Get word count from input text
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Transform all voices mutation
  const transformAllMutation = useTransformAll();

  // Regenerate mutation
  const regenerateMutation = useRegenerateTransform((data) => {
    // Update the specific brand result with new data
    setTransformationResults(prevResults => 
      prevResults.map(result => 
        result.brandVoice === data.brandVoice ? data : result
      )
    );
  });

  // Handle transform all function
  const handleTransformAll = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    
    try {
      const result = await transformAllMutation.mutateAsync({
        text: inputText,
        contentType
      });
      
      setTransformationResults(result.transformations);
      setSelectedTab("all");
    } catch (error) {
      console.error("Transform error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter results based on selected tab
  const filteredResults = selectedTab === "all" 
    ? transformationResults 
    : transformationResults.filter(result => result.brandVoice === selectedTab);

  // Handle regenerate for a specific brand
  const handleRegenerate = (brandVoice: BrandVoice) => {
    regenerateMutation.mutate({
      text: inputText,
      brandVoice: brandVoice as BrandVoice,
      contentType
    });
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark">Brand Voice Transformer</h2>
        <p className="text-dark-medium mt-2">Transform generic content to match specific brand voices through AI</p>
      </div>

      {/* Main Transform Interface - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Original Content</h3>
              
              {/* Content Type Selection */}
              <div className="mb-4">
                <label className="block text-dark-medium text-sm font-medium mb-2">Content Type</label>
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
                  className="w-full resize-none"
                  placeholder="Enter your generic content here to transform it into brand-specific voice..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex justify-between text-xs text-dark-light mt-1">
                  <span>Word count: {wordCount}</span>
                  <button 
                    className="text-primary hover:text-blue-700"
                    onClick={clearText}
                  >
                    Clear text
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleTransformAll}
                  disabled={isLoading || !inputText.trim()}
                  className="flex-grow"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Transform All Voices
                </Button>
                <Button 
                  variant="outline" 
                  onClick={loadExample}
                  className="flex-grow"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Load Example
                </Button>
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

export default Home;
