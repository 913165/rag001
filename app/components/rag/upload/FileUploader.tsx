// components/rag/upload/FileUploader.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { Upload, X, File, Check, Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FileInfo {
  name: string;
  size: number;
  path: string;
  uploadedAt: string;
}

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onUploadComplete?: (fileInfos: any[]) => void;
}

export const FileUploader = ({ onFilesSelected, onUploadComplete }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'complete' | 'error'>('idle');

  // Fetch existing files when component mounts
  useEffect(() => {
    fetchExistingFiles();
  }, []);

  const fetchExistingFiles = async () => {
    console.log('Fetching existing files...');
    try {
      const response = await fetch('/api/files');
      console.log('response', response);
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setExistingFiles(data.files);
    } catch (error) {
      console.error('Error fetching existing files:', error);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    setUploadStatus('uploading');

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadStatus('complete');
      onUploadComplete?.(data.files);
      
      // Refresh the list of existing files
      fetchExistingFiles();
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (filename: string) => {
    try {
      const response = await fetch(`/api/files/${filename}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete file');
      
      // Refresh the list after deletion
      fetchExistingFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        {/* Upload Box */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              handleFiles(files);
            }}
            accept=".pdf,.doc,.docx,.txt,.md,.csv"
          />
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-4 bg-blue-50 rounded-full">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">
              Drop files here or click to upload
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Support for PDF, DOCX, TXT, MD, and CSV
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Select Files
            </button>
          </div>
        </div>

        {/* Existing Files */}
        {existingFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-700">Uploaded Files</h4>
            {existingFiles.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • 
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus !== 'idle' && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50">
            {uploadStatus === 'uploading' && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Uploading files...</span>
              </div>
            )}
            {uploadStatus === 'complete' && (
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Upload complete</span>
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="flex items-center space-x-2 text-red-600">
                <X className="w-4 h-4" />
                <span className="text-sm">Upload failed</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};