import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import OpenAI from "openai";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const openrouter = new OpenAI({ baseURL: "https://openrouter.ai/api/v1", apiKey: process.env.OPENROUTER_API_KEY });
const groq = new OpenAI({ baseURL: "https://api.groq.com/openai/v1", apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { tab, prompt } = await req.json();
  try {
    if (tab === "image") {
      const output = await replicate.run("stability-ai/sdxl", { input: { prompt, width: 1024, height: 1024 } });
      return NextResponse.json({ result: output[0], type: "image" });
    }
    if (tab === "voice") {
      const chat = await groq.chat.completions.create({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }] });
      return NextResponse.json({ result: chat.choices[0].message.content, type: "text" });
    }
    const completion = await openrouter.chat.completions.create({ model: "deepseek/deepseek-chat-v3", messages: [{ role: "user", content: prompt }] });
    return NextResponse.json({ result: completion.choices[0].message.content, type: "text" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}