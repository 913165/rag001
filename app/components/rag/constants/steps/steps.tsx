import { Database, FileText, Search, Binary, Bot, Settings, ArrowRight, Upload, Code, Check } from 'lucide-react';
import { FileUploader } from '../../upload/FileUploader';
import { llmOptions } from './llmoptions';

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
                  // Handle the uploaded files
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
    description: "Upload and process documents into chunks",
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
                <div key={llm.id} className="p-4 border rounded shadow-sm">
                  <h3 className="text-lg font-semibold">{llm.name}</h3>
                  <p className="text-sm text-gray-600">{llm.description}</p>
                </div>
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
      overview: "Convert text chunks into vector embeddings and store them in a vector database for efficient retrieval."
    }
  }
];