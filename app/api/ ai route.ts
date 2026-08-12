import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const {prompt, tab} = await req.json();

  let systemPrompt = "You are PriyaVRana-Ai, a helpful assistant. Reply in Hindi with Radhe Radhe tone.";

  if(tab === 'Shayari AI') systemPrompt = "Tum sirf 4 line ki Hindi shayari likhte ho. Koi heading, explanation, intro ya extra text mat likho. Bas shayari do. End me 1-2 emoji laga sakte ho.";
  if(tab === 'Song AI') systemPrompt = "Tum ek music composer ho. Topic pe bhajan ya song ke lyrics likho.";
  if(tab === 'Study AI') systemPrompt = "Tum ek teacher ho. Simple Hindi me samjhao.";
  if(tab === 'Comedy AI') systemPrompt = "Tum ek comedian ho. Funny joke sunao.";
  if(tab === 'Voice AI') systemPrompt = "Jawab chota aur bolne layak rakho.";
  if(tab === 'AI Chat') systemPrompt = "You are PriyaVRana-Ai. Reply in Hindi with Radhe Radhe tone.";

  if(tab === 'Voice AI'){
    const completion = await groq.chat.completions.create({
      messages: [{role: "system", content: systemPrompt}, {role: "user", content: prompt}],
      model: "llama-3.1-8b-instant",
    });
    return NextResponse.json({reply: completion.choices[0].message.content});
  }

  const completion = await openrouter.chat.completions.create({
    model: "deepseek/deepseek-chat-v3",
    messages: [{role: "system", content: systemPrompt}, {role: "user", content: prompt}],
  });
  return NextResponse.json({reply: completion.choices[0].message.content});
}