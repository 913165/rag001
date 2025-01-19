// app/api/files/[filename]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
    request: Request,
    { params }: { params: { filename: string } }
) {
    try {
        const filename = params.filename;
        const filepath = path.join(process.cwd(), 'uploads', filename);
        
        await fs.unlink(filepath);
        
        return NextResponse.json({ message: 'File deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting file' }, 
            { status: 500 }
        );
    }
}

