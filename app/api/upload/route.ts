// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files');

        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        const savedFiles = await Promise.all(
            files.map(async (file: any) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = `${Date.now()}-${file.name}`;
                const filepath = path.join(uploadDir, filename);
                
                await writeFile(filepath, buffer);
                
                return {
                    originalName: file.name,
                    filename: filename,
                    filepath: filepath,
                    size: file.size,
                    type: file.type
                };
            })
        );

        return NextResponse.json({ 
            message: 'Files uploaded successfully', 
            files: savedFiles 
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error uploading files' }, 
            { status: 500 }
        );
    }
}