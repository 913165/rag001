import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from 'lucide-react';

const queryFeatures = [
  {
    name: 'Query Expansion',
    description: 'Enhance queries with semantic understanding',
    options: [
      'Synonym expansion',
      'Context enrichment',
      'Entity recognition',
      'Query rewriting'
    ]
  },
  {
    name: 'Query Routing',
    description: 'Route queries to appropriate processing pipelines',
    options: [
      'Intent classification',
      'Complexity assessment',
      'Domain routing',
      'Language detection'
    ]
  },
  {
    name: 'Query Optimization',
    description: 'Optimize queries for better retrieval results',
    options: [
      'Token limitation',
      'Filter optimization',
      'Cache utilization',
      'Query decomposition'
    ]
  }
];

const QuerySearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to process query');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Query Search</h3>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </div>
              )}
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Search Results</h4>
            {results.map((result, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Score: {(result.score * 100).toFixed(2)}%
                    </p>
                    <p className="text-sm">{result.content}</p>
                    <p className="text-xs text-gray-500">
                      Source: {result.metadata?.source || 'Unknown'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const QueryImplementation = [
  {
    title: "Query Pipeline",
    description: "Set up query preprocessing pipeline",
    component: (
      <div className="max-w-3xl mx-auto space-y-6">
        {queryFeatures.map((feature) => (
          <Card key={feature.name} className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">Options:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {feature.options.map((option) => (
                    <span
                      key={option}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Query Processing Settings:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum Query Length: 1000 tokens</li>
            <li>• Response Timeout: 30 seconds</li>
            <li>• Cache Duration: 1 hour</li>
            <li>• Reranking: Enabled</li>
          </ul>
        </div>

        <QuerySearchComponent />
      </div>
    )
  },
  {
    title: "Query Implementation",
    description: "Implementation of query processing logic",
    code: `// Query Processing Pipeline
const processQuery = async (query: string) => {
  // Query preprocessing
  const enhancedQuery = await queryEnhancer.process(query);
  
  // Intent classification
  const intent = await intentClassifier.classify(enhancedQuery);
  
  // Route to appropriate handler
  const handler = queryRouter.getHandler(intent);
  
  // Execute query with appropriate parameters
  const result = await handler.execute({
    query: enhancedQuery,
    options: {
      maxResults: 5,
      minScore: 0.7,
      useCache: true,
      timeout: 30000
    }
  });
  
  return result;
};

// Query Enhancement
const queryEnhancer = {
  process: async (query) => {
    // Synonym expansion
    const withSynonyms = await expandSynonyms(query);
    
    // Entity recognition
    const entities = await extractEntities(withSynonyms);
    
    // Context enrichment
    const enriched = await enrichContext(withSynonyms, entities);
    
    return enriched;
  }
};`
  }
];

export default QueryImplementation;