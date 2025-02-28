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
        console.log("Received POST request  outer");
        const requestBody = await request.json();
        console.log("Request body:", requestBody);

        const { filename } = requestBody;

        let collection_name = "vectpr_store";

        if (!filename) {
            throw new Error("Filename is missing in the request body..outer");
        }

        if (!collection_name) {
            throw new Error("Collection name is missing in the request body..outer");
        }

        console.log("Processing file on server:", filename);
        const filepath = path.join(process.cwd(), 'uploads', filename);

        const formData = new FormData();
        formData.append('file', new Blob([await fs.readFile(filepath)]), filename);
        formData.append('collection_name', collection_name);

        const response = await fetch('http://localhost:8000/process-file', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
            },
            body: formData,
        });

        console.log("Response from python server:", response);
        return NextResponse.json({ message: 'File processed successfully' });
    } catch (error) {
        console.error('Error processing file:', error);
        return NextResponse.json(
            { error: 'Error processing file' },
            { status: 500 }
        );
    }
}