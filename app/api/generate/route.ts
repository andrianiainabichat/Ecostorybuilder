import { NextRequest, NextResponse } from 'next/server';
import { generateStoryContent, enhanceStoryTitle } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, location, language } = body;

    if (!theme || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [content, title] = await Promise.all([
      generateStoryContent(theme, location, language),
      enhanceStoryTitle(theme, location),
    ]);

    return NextResponse.json({ title, content });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}