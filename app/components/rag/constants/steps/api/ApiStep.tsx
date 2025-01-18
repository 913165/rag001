// components/rag/steps/api/ApiStep.tsx
import { Card, CardContent } from '@/components/ui/card';

const apiFeatures = [
  {
    name: 'Authentication',
    description: 'Secure API access with multiple auth methods',
    features: [
      'API Keys',
      'JWT Tokens',
      'OAuth2',
      'IP Whitelisting'
    ]
  },
  {
    name: 'Rate Limiting',
    description: 'Control API usage and resource allocation',
    features: [
      'Request Quotas',
      'Concurrent Limits',
      'Burst Control',
      'Usage Tiers'
    ]
  },
  {
    name: 'Monitoring',
    description: 'Track API performance and usage metrics',
    features: [
      'Usage Analytics',
      'Error Tracking',
      'Latency Monitoring',
      'Health Checks'
    ]
  },
  {
    name: 'Documentation',
    description: 'Comprehensive API documentation and guides',
    features: [
      'OpenAPI Spec',
      'Code Samples',
      'Integration Guides',
      'API Reference'
    ]
  }
];

export const ApiImplementation = [
  {
    title: "API Configuration",
    description: "Configure API endpoints and security",
    component: (
      <div className="max-w-3xl mx-auto space-y-6">
        {apiFeatures.map((feature) => (
          <Card key={feature.name} className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">Features:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {feature.features.map((item) => (
                    <span 
                      key={item}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {item}
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
    title: "API Implementation",
    description: "Implementation of API endpoints",
    code: `// API Routes Configuration
import express from 'express';
import { auth, rateLimiter, monitor } from './middleware';

const app = express();

// Middleware
app.use(auth.apiKey());
app.use(rateLimiter.configure({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(monitor.trackUsage());

// Query Endpoint
app.post('/api/rag/query', 
  validateQuery,
  async (req, res) => {
    const { query, options } = req.body;
    
    try {
      const results = await ragService.processQuery(query, options);
      return res.json(results);
    } catch (error) {
      return res.status(500).json({
        error: 'Query processing failed',
        details: error.message
      });
    }
});

// Document Upload Endpoint
app.post('/api/rag/upload',
  validateFiles,
  async (req, res) => {
    const files = req.files;
    
    try {
      const results = await ragService.processDocuments(files);
      return res.json(results);
    } catch (error) {
      return res.status(500).json({
        error: 'Document processing failed',
        details: error.message
      });
    }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const status = {
    service: 'ok',
    database: dbHealth.check(),
    vectorStore: vectorStoreHealth.check(),
    cache: cacheHealth.check()
  };
  
  res.json(status);
});

// Usage Stats Endpoint
app.get('/api/stats',
  auth.adminOnly(),
  async (req, res) => {
    const stats = await monitor.getStats();
    res.json(stats);
});`
  },
  {
    title: "Error Handling",
    description: "API error handling and response formatting",
    code: `// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  
  // Log error
  logger.error({
    error: message,
    stack: error.stack,
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      user: req.user?.id
    }
  });
  
  // Send formatted response
  res.status(status).json({
    error: message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
    path: req.path
  });
});`
  }
];

export default ApiImplementation;