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