import { NextResponse } from "next/server";

const HF_ACCESS_TOKEN = process.env.HUGGING_FACE_API_KEY; // Add this to your .env.local
const HF_MODEL_NAME = process.env.HUGGING_FACE_MODEL_NAME; // Add this to your .env.local
const API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL_NAME}`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json({ response: result[0].generated_text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
