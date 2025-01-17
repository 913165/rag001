// utils/fileManager.ts
import fs from 'fs/promises';
import path from 'path';

export class FileManager {
  private static uploadDir = path.join(process.cwd(), 'uploads');

  static async initializeStorage() {
    try {
      await fs.mkdir(FileManager.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error initializing storage:', error);
      throw error;
    }
  }

  static async saveFile(file: Buffer, filename: string) {
    const filepath = path.join(FileManager.uploadDir, filename);
    await fs.writeFile(filepath, file);
    return filepath;
  }

  static async getFile(filename: string) {
    const filepath = path.join(FileManager.uploadDir, filename);
    return await fs.readFile(filepath);
  }

  static async deleteFile(filename: string) {
    const filepath = path.join(FileManager.uploadDir, filename);
    await fs.unlink(filepath);
  }

  static async listFiles() {
    return await fs.readdir(FileManager.uploadDir);
  }
}