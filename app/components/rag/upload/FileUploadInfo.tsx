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

export const FileUploadInfo = ({ onFilesSelected, onUploadComplete }: FileUploaderProps) => {
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
                <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                />
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

       
      </CardContent>
    </Card>
  );
};