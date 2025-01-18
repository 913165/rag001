// components/rag/steps/upload/FileUploadStep.tsx
import { FileUploader } from '../../../upload/FileUploader';
import { Check } from 'lucide-react';

export const FileUploadImplementation = [
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
];