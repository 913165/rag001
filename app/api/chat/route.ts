// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, context = [] } = await req.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Call Python backend endpoint
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: query,
        chat_history: context,
        similarity_threshold: 0.7,
        top_k: 5
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Python backend');
    }

    const data = await response.json();
    
    return NextResponse.json({
      content: data.answer,
      sources: data.sources,
      metadata: {
        similarity_scores: data.similarity_scores,
        processing_time: data.processing_time
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat query' },
      { status: 500 }
    );
  }
}