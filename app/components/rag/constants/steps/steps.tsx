// components/rag/constants/steps.ts
import { Database, FileText, Search, Binary, Bot, Settings, ArrowRight, Upload, Code, Check } from 'lucide-react';
import { FileUploader } from '../../upload/FileUploader';
import { llmOptions } from './llmoptions';
import { Card, CardContent } from '@/components/ui/card';

export const steps = [
  {
    title: "Document Upload",
    description: "Upload your documents for processing",
    icon: Upload,
    content: {
      overview: "Start by uploading your documents. You can upload multiple files at once, and we support various formats including PDF, DOCX, and TXT.",
      implementation: [
        {
          title: "File Upload",
          description: "Upload your documents using drag and drop or file selection",
          component: (
            <div className="max-w-2xl mx-auto">
              <FileUploader 
                onFilesSelected={(files) => {
                  console.log('Selected files:', files);
                }}
                onUploadComplete={(fileInfos) => {
                  console.log('Upload complete:', fileInfos);
                }}
              />
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Supported File Types:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• PDF Documents (.pdf)</li>
                  <li>• Word Documents (.docx, .doc)</li>
                  <li>• Text Files (.txt)</li>
                  <li>• Markdown Files (.md)</li>
                  <li>• CSV Files (.csv)</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          title: "Processing Status",
          description: "Track the status of your uploaded documents",
          component: (
            <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Ready to process uploaded documents
                </span>
              </div>
            </div>
          )
        }
      ]
    }
  },
  {
    title: "Document Ingestion",
    description: "Process documents into chunks",
    icon: FileText,
    content: {
      overview: "Configure document processing pipeline and select LLM providers for embeddings and generation.",
      implementation: [
        {
          title: "LLM Provider Selection",
          description: "Choose LLM providers for your RAG implementation",
          component: (
            <div className="space-y-4 mb-6">
              {llmOptions.map((llm) => (
                <Card key={llm.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{llm.name}</h3>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        }
      ]
    }
  },
  {
    title: "Vector Storage",
    description: "Store document embeddings efficiently",
    icon: Database,
    content: {
      overview: "Convert text chunks into vector embeddings and store them in a vector database for efficient retrieval.",
      implementation: [
        {
          title: "Vector Database Selection",
          description: "Choose and configure your vector database",
          component: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
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
              ].map((db) => (
                <Card key={db.name} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{db.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{db.description}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-700">Features:</span>
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
                  </CardContent>
                </Card>
              ))}
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
const vectorStore = await VectorStore.initialize(config);`
        }
      ]
    }
  },
  {
    title: "Query Processing",
    description: "Process and optimize queries",
    icon: Search,
    content: {
      overview: "Configure query processing and optimization for better retrieval results.",
      implementation: [
        {
          title: "Query Pipeline",
          description: "Set up query preprocessing pipeline",
          component: (
            <div className="space-y-4">
              {[
                {
                  name: 'Query Expansion',
                  description: 'Enhance queries with semantic understanding',
                  options: ['Synonym expansion', 'Context enrichment', 'Entity recognition']
                },
                {
                  name: 'Query Routing',
                  description: 'Route queries to appropriate processing pipelines',
                  options: ['Intent classification', 'Complexity assessment', 'Domain routing']
                }
              ].map((feature) => (
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
            </div>
          )
        }
      ]
    }
  },
  {
    title: "API Integration",
    description: "Expose RAG capabilities via API",
    icon: Settings,
    content: {
      overview: "Create and configure API endpoints for RAG functionality.",
      implementation: [
        {
          title: "API Endpoints",
          description: "Configure RESTful API endpoints",
          code: `// API Routes Configuration
app.post('/api/rag/query', async (req, res) => {
  const { query, options } = req.body;
  const results = await ragService.processQuery(query, options);
  return res.json(results);
});

app.post('/api/rag/upload', async (req, res) => {
  const files = req.files;
  const results = await ragService.processDocuments(files);
  return res.json(results);
});`
        },
        {
          title: "API Security",
          description: "Configure API security and rate limiting",
          component: (
            <div className="space-y-4">
              {[
                {
                  name: 'Authentication',
                  features: ['API Keys', 'JWT Tokens', 'OAuth2']
                },
                {
                  name: 'Rate Limiting',
                  features: ['Request Quotas', 'Concurrent Limits', 'Burst Control']
                }
              ].map((section) => (
                <Card key={section.name} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {section.features.map((feature) => (
                          <span 
                            key={feature}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
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
      ]
    }
  }
];