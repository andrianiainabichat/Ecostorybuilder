import { NextRequest, NextResponse } from 'next/server';
import { createStory, getAllStories, initDatabase } from '@/lib/db';

export async function GET() {
  try {
    const stories = getAllStories();
    return NextResponse.json({ stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    initDatabase();
    const body = await request.json();
    
    const { title, content, latitude, longitude, location_name, theme, author, points } = body;

    if (!title || !content || !latitude || !longitude || !location_name || !theme || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const storyId = createStory({
      title,
      content,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      location_name,
      theme,
      author,
      points: points || 50,
    });

    return NextResponse.json({ success: true, storyId });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
  }
}