import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        console.log("Received POST request for similarity search");

        const requestBody = await request.json();
        console.log("Request body:", requestBody);

        const response = await fetch('http://localhost:8000/similarity-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to perform similarity search');
        }

        const responseData = await response.json();
        console.log("Response from similarity search:", responseData);

        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Error performing similarity search:', error);
        return NextResponse.json(
            { error: 'Error performing similarity search' },
            { status: 500 }
        );
    }
}