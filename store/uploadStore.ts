// store/uploadStore.ts
import { create } from 'zustand';

interface UploadedFile {
  name: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface UploadStore {
  files: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  updateFileStatus: (fileName: string, status: UploadedFile['status']) => void;
  clearFiles: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  addFile: (file) => 
    set((state) => ({ 
      files: [...state.files, file] 
    })),
  updateFileStatus: (fileName, status) =>
    set((state) => ({
      files: state.files.map(file =>
        file.name === fileName ? { ...file, status } : file
      )
    })),
  clearFiles: () => set({ files: [] })
}));