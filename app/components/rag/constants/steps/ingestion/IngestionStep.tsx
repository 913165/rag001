// components/rag/steps/ingestion/IngestionStep.tsx
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { llmOptions } from '../llmoptions';
import { useState } from 'react';

export const IngestionImplementation = [
  {
    title: "LLM Provider Selection",
    description: "Choose an LLM provider for processing your documents",
    component: (
      <div className="max-w-3xl mx-auto">
        <RadioGroup defaultValue="" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {llmOptions.map((llm) => (
            <Card 
              key={llm.id} 
              className="relative border cursor-pointer transition-all hover:border-blue-300"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={llm.id} id={llm.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={llm.id} className="text-lg font-semibold cursor-pointer">
                      {llm.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{llm.description}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">Available Models:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {llm.models.map((model) => (
                          <span
                            key={model}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Processing Configuration:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Chunk Size: 1000 tokens</li>
            <li>• Overlap: 200 tokens</li>
            <li>• Processing Mode: Semantic chunking</li>
            <li>• Language Detection: Automatic</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "Processing Configuration",
    description: "Configure document processing parameters",
    code: `// Document Processing Configuration
const config = {
  chunkSize: 1000,
  chunkOverlap: 200,
  encoding: 'cl100k_base',
  processingMode: 'semantic',
  languageDetection: true,
  preserveMarkdown: true
};

// Initialize Document Processor
const processor = await DocumentProcessor.initialize(config);`
  }
];

export default IngestionImplementation;