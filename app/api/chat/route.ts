import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = "" // TODO

export const POST = async (req: Request, __res: Response) => {
  // console.log(`Processing request~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  const openai = new OpenAI();
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...data
    ],
    model: "gpt-4o-mini",
    stream: true,
  });
  
  const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try{
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        }
        catch(e){
          controller.error(e);
        }
        finally {
          controller.close();
        } 
      },
    });
    return new NextResponse(stream);
};
