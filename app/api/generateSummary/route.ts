import { NextResponse } from 'next/server';
import { openai } from '../../../lib/openai';

export async function POST(request: Request) {
  const { todos } = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: 'Welcome the user. Limit to 200 words.',
      },
      {
        role: 'user',
        content: `Provide a 50 word summary of the following todos. Count the number of todos in each category. Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
