import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: openai('gpt-4o'),
      messages,
    });

    return Response.json({
      id: Date.now().toString(),
      role: 'assistant',
      content: result.text
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}