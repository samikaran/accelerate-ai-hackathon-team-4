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

  if (!HF_MODEL_NAME) {
    return NextResponse.json(
      { error: "Hugging model name not configured" },
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

    console.log("Sending request to:", API_URL);
    console.log("Message:", message);

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
          // max_length: 1000,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // console.error("Hugging Face API error:", errorData);
      console.error("Hugging Face API error details:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `API Error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("API Response:", result);
    // return NextResponse.json({ response: result[0].generated_text });
    // Handle the response format correctly
    const generatedText = Array.isArray(result)
      ? result[0].generated_text
      : result.generated_text;

    return NextResponse.json({ response: generatedText });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
