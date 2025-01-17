# RAG as a Service Implementation

A modern Next.js application that implements Retrieval-Augmented Generation (RAG) as a service with a user-friendly interface.

## Features

- 📁 Document Upload System
- 🔄 Document Processing Pipeline
- 💾 Vector Storage Integration
- 🔍 Query Processing
- 🤖 LLM Integration
- 🚀 API Endpoints

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Project Structure

```
rag-service/
├── app/
│   ├── api/
│   │   ├── files/
│   │   │   ├── route.ts
│   │   │   └── [filename]/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── rag/
│       ├── constants/
│       │   ├── llmOptions.ts
│       │   └── steps.ts
│       ├── upload/
│       │   └── FileUploader.tsx
│       ├── sections/
│       │   ├── Sidebar.tsx
│       │   └── MainContent.tsx
│       └── RAGStepsUI.tsx
├── uploads/                # File storage directory
└── types/
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rag-service
```

2. Install dependencies:
```bash
npm install
```

3. Set up required packages:
```bash
# Install UI components
npm install @radix-ui/react-slot
npm install lucide-react
npm install class-variance-authority
npm install clsx
npm install tailwind-merge

# Install shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add card
```

4. Create the uploads directory:
```bash
mkdir uploads
```

5. Run the development server:
```bash
npm run dev
```

## Core Components

### 1. File Upload System
- Drag and drop functionality
- Multiple file support
- Progress tracking
- File type validation
- Existing files management

```typescript
// Usage example
<FileUploader 
  onFilesSelected={(files) => console.log('Selected:', files)}
  onUploadComplete={(fileInfos) => console.log('Complete:', fileInfos)}
/>
```

### 2. Document Processing
- Support for multiple file types:
  - PDF (.pdf)
  - Word Documents (.docx, .doc)
  - Text Files (.txt)
  - Markdown (.md)
  - CSV (.csv)

### 3. LLM Integration
Supported providers:
- OpenAI
- Anthropic Claude
- Cohere
- Mistral AI
- LlamaV2
- Google Vertex AI

### 4. Vector Storage
Supported databases:
- Pinecone
- Weaviate
- Milvus
- Chroma

## API Endpoints

### File Management

```typescript
// Upload files
POST /api/upload
Content-Type: multipart/form-data

// List files
GET /api/files

// Delete file
DELETE /api/files/:filename
```

### RAG Operations

```typescript
// Process query
POST /api/rag/query
{
  "query": string,
  "options": {
    "temperature": number,
    "maxTokens": number
  }
}

// Process documents
POST /api/rag/process
{
  "files": string[],
  "options": {
    "chunkSize": number,
    "overlap": number
  }
}
```

## Implementation Steps

1. **Document Upload**
   - File selection and validation
   - Upload status tracking
   - File management interface

2. **Document Ingestion**
   - Text extraction
   - Chunking configuration
   - LLM provider selection

3. **Vector Storage**
   - Database selection
   - Embedding generation
   - Storage configuration

4. **Query Processing**
   - Query optimization
   - Context retrieval
   - Response generation

5. **API Integration**
   - Endpoint configuration
   - Authentication setup
   - Rate limiting

## Configuration

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig
```

## Security Considerations

- File type validation
- Size limits
- API authentication
- Rate limiting
- Secure file storage

## Development

### Adding New Features

1. Create component in appropriate directory
2. Update types if necessary
3. Add to steps configuration
4. Implement API endpoints if required

### Testing

1. Component testing
2. API endpoint testing
3. File processing testing
4. Integration testing

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)