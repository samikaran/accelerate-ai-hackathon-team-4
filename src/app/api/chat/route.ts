import { NextResponse } from "next/server";

const HF_ACCESS_TOKEN = process.env.HUGGING_FACE_API_KEY;
const HF_MODEL_NAME = process.env.HUGGING_FACE_MODEL_NAME; // Add this to your .env.local
const API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL_NAME}`;

export const runtime = "edge"; // Add this for better performance on Vercel

export async function POST(req: Request) {
  if (!HF_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Hugging Face API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Format the prompt for Mixtral
    const prompt = `<s>[INST] ${message} [/INST]`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Hugging Face API error:", errorData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ response: result[0].generated_text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
