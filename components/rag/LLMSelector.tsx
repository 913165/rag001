// components/rag/llm/LLMSelector.tsx
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface LLMOption {
  id: string;
  name: string;
  models: string[];
  description: string;
}

interface LLMSelectorProps {
  options: LLMOption[];
  selectedLLM: string;
  onSelect: (llmId: string) => void;
}

export const LLMSelector = ({ options, selectedLLM, onSelect }: LLMSelectorProps) => {
  return (
    <div className="space-y-4">
      <RadioGroup value={selectedLLM} onValueChange={onSelect}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((llm) => (
            <Card 
              key={llm.id}
              className={`relative border cursor-pointer transition-all ${
                selectedLLM === llm.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onSelect(llm.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div 
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      selectedLLM === llm.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedLLM === llm.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{llm.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {llm.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        Available Models:
                      </span>
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
        </div>
      </RadioGroup>
    </div>
  );
};