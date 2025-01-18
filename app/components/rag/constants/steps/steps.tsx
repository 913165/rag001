// components/rag/constants/steps.tsx
import { Database, FileText, Search, Binary, Bot, Settings, Upload } from 'lucide-react';
import { FileUploadImplementation } from '../steps/upload/FileUploadStep';
import { IngestionImplementation } from '../steps/ingestion/IngestionStep';
import { VectorStorageImplementation } from '../steps/vector/VectorStorageStep';
import { QueryImplementation } from '../steps/query/QueryStep';
import { ApiImplementation } from '../steps/api/ApiStep';

export const steps = [
  {
    title: "Document Upload",
    description: "Upload your documents for processing",
    icon: Upload,
    content: {
      overview: "Start by uploading your documents...",
      implementation: FileUploadImplementation
    }
  },
  {
    title: "Document Ingestion",
    description: "Process documents into chunks",
    icon: FileText,
    content: {
      overview: "Configure document processing pipeline...",
      implementation: IngestionImplementation
    }
  },
  {
    title: "Vector Storage",
    description: "Store document embeddings efficiently",
    icon: Database,
    content: {
      overview: "Convert text chunks into vector embeddings...",
      implementation: VectorStorageImplementation
    }
  },
  {
    title: "Query Processing",
    description: "Process and optimize queries",
    icon: Search,
    content: {
      overview: "Configure query processing...",
      implementation: QueryImplementation
    }
  },
  {
    title: "API Integration",
    description: "Expose RAG capabilities via API",
    icon: Settings,
    content: {
      overview: "Create and configure API endpoints...",
      implementation: ApiImplementation
    }
  }
];