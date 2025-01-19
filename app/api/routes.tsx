// app/api/files/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const uploadDir = path.join(process.cwd(), 'uploads');
        const files = await fs.readdir(uploadDir);
        console.log("files", files);
        const fileInfos = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(uploadDir, filename);
                const stats = await fs.stat(filePath);
                
                return {
                    name: filename,
                    size: stats.size,
                    uploadedAt: stats.mtime,
                    path: filePath
                };
            })
        );

        return NextResponse.json({ files: fileInfos });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching files' }, 
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { filename } = await request.json();
        console.log("Processing file on server:", filename);
        const filepath = path.join(process.cwd(), 'uploads', filename);
        
        // Add your file processing logic here
        console.log("Processing file at path:", filepath);
        
        return NextResponse.json({ message: 'File processed successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error processing file' }, 
            { status: 500 }
        );
    }
}