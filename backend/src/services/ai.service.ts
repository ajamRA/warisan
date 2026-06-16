import { env } from '../config/env.js';

let openai: any = null;

async function getOpenAI() {
  if (!env.OPENAI_API_KEY) {
    throw new Error('AI features require OPENAI_API_KEY');
  }
  if (!openai) {
    const { default: OpenAI } = await import('openai');
    openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }
  return openai;
}

export async function summarize(content: string): Promise<string> {
  const client = await getOpenAI();
  const response = await client.chat.completions.create({
    model: env.AI_MODEL,
    messages: [
      { role: 'system', content: 'Summarize the following tutorial in 3-5 concise sentences. Focus on the key steps and purpose.' },
      { role: 'user', content },
    ],
  });
  return response.choices[0].message.content;
}

export async function translate(content: string, targetLang: string): Promise<string> {
  const client = await getOpenAI();
  const response = await client.chat.completions.create({
    model: env.AI_MODEL,
    messages: [
      { role: 'system', content: `Translate the following content to ${targetLang}. Preserve formatting and structure.` },
      { role: 'user', content },
    ],
  });
  return response.choices[0].message.content;
}

export async function extractMetadata(content: string) {
  const client = await getOpenAI();
  const response = await client.chat.completions.create({
    model: env.AI_MODEL,
    messages: [
      {
        role: 'system',
        content: `Extract metadata from this skill tutorial. Return JSON with: tags (array of 3-5 relevant tags), difficulty (beginner/intermediate/advanced/master), learningTime (estimated time), category (suggested category slug).`,
      },
      { role: 'user', content },
    ],
    response_format: { type: 'json_object' },
  });
  return JSON.parse(response.choices[0].message.content);
}

export async function generateSteps(description: string): Promise<string> {
  const client = await getOpenAI();
  const response = await client.chat.completions.create({
    model: env.AI_MODEL,
    messages: [
      {
        role: 'system',
        content: `Generate detailed step-by-step instructions for this skill. Use markdown formatting with numbered steps, bold key terms, and clear descriptions.`,
      },
      { role: 'user', content: description },
    ],
  });
  return response.choices[0].message.content;
}
