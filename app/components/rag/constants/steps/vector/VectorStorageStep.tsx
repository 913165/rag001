// components/rag/steps/vector/VectorStorageStep.tsx
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const vectorDatabases = [
  {
    name: 'Pinecone',
    description: 'Managed vector database with high scalability',
    features: ['Serverless', 'Real-time updates', 'Multiple indexes']
  },
  {
    name: 'Weaviate',
    description: 'Open-source vector database with GraphQL API',
    features: ['Schema-based', 'Multi-modal', 'Filters']
  },
  {
    name: 'Milvus',
    description: 'Distributed vector database for enterprise',
    features: ['High availability', 'Horizontal scaling', 'Complex queries']
  },
  {
    name: 'Chroma',
    description: 'Lightweight embedded vector database',
    features: ['Easy setup', 'Local deployment', 'Python native']
  }
];

export const VectorStorageImplementation = [
  {
    title: "Vector Database Selection",
    description: "Choose and configure your vector database",
    component: (
      <div className="max-w-3xl mx-auto">
        <RadioGroup defaultValue="" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vectorDatabases.map((db) => (
            <Card 
              key={db.name}
              className="relative border cursor-pointer transition-all hover:border-blue-300"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={db.name.toLowerCase()} id={db.name.toLowerCase()} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={db.name.toLowerCase()} className="text-lg font-semibold cursor-pointer">
                      {db.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {db.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        Features:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {db.features.map((feature) => (
                          <span 
                            key={feature}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
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
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Vector DB Configuration:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Dimensions: 1536 (OpenAI compatible)</li>
            <li>• Distance Metric: Cosine similarity</li>
            <li>• Index Type: HNSW</li>
            <li>• Pods: 1 (scalable)</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "Configuration",
    description: "Set up vector database configuration",
    code: `// Vector Database Configuration
const config = {
  environment: 'production',
  dimensions: 1536,  // OpenAI embedding dimensions
  metric: 'cosine',
  pods: 1,
  replicas: 1,
  podType: 'p1.x1'
};

// Initialize Vector Store
const vectorStore = await VectorStore.initialize(config);

// Index Configuration
const indexConfig = {
  indexName: 'rag-documents',
  indexType: 'hnsw',
  parameters: {
    efConstruction: 400,
    m: 64,
    efSearch: 100
  }
};

// Create Index
await vectorStore.createIndex(indexConfig);

// Metadata Configuration
const metadataConfig = {
  schema: {
    filename: 'string',
    chunkId: 'integer',
    timestamp: 'datetime',
    source: 'string',
    language: 'string'
  },
  indexed: ['filename', 'source', 'language']
};

// Apply Metadata Schema
await vectorStore.setMetadataSchema(metadataConfig);`
  },
  {
    title: "Performance Settings",
    description: "Configure vector database performance parameters",
    component: (
      <div className="space-y-4">
        {[
          {
            name: 'Search Configuration',
            settings: ['Top K: 10', 'Similarity Threshold: 0.7', 'Query Expansion: Enabled']
          },
          {
            name: 'Resource Allocation',
            settings: ['Memory: 4GB', 'CPU: 2 cores', 'Storage: 10GB']
          },
          {
            name: 'Optimization',
            settings: ['Caching: Enabled', 'Batch Size: 100', 'Concurrent Requests: 5']
          }
        ].map((section) => (
          <Card key={section.name} className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{section.name}</h3>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {section.settings.map((setting) => (
                    <span 
                      key={setting}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {setting}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
];

export default VectorStorageImplementation;