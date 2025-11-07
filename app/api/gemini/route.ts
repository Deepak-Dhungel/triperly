import { getResponseFromGemini } from "@/service/gemini";
import { GenerateContentResult } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    const geminiResponse: GenerateContentResult =
      await getResponseFromGemini.sendMessage(prompt);

    if (geminiResponse.response.candidates) {
      const geminiData =
        geminiResponse.response.candidates[0].content.parts[0].text;
      if (geminiData) {
        const tripResult = JSON.parse(geminiData);
        return NextResponse.json({ tripResult });
      }
    }
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
  }
}
