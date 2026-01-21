import { NextResponse } from 'next/server';
import { fetchInstagramReels } from '@/lib/instagram';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const reels = await fetchInstagramReels(limit);
    
    return NextResponse.json({
      success: true,
      count: reels.length,
      reels,
    });
  } catch (error) {
    console.error('Error in Instagram API route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reels' },
      { status: 500 }
    );
  }
}
