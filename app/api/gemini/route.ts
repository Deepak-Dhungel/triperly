import { getResponseFromGemini } from "@/service/gemini";
import { GenerateContentResult } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({
      error: "Missing or invalid prompt",
      status: 400,
    });
  }

  try {
    const geminiResponse: GenerateContentResult =
      await getResponseFromGemini.sendMessage(prompt);

    if (geminiResponse.response.candidates) {
      const candidate = geminiResponse.response.candidates[0];
      if (!candidate?.content?.parts?.[0].text) {
        return NextResponse.json({
          error: "Invalid Gemini response structure",
          status: 500,
        });
      }
      const geminiData = candidate.content.parts[0].text;
      if (geminiData) {
        const tripResult = JSON.parse(geminiData);
        return NextResponse.json({ tripResult });
      }
    }
    return NextResponse.json({
      error: "No valid response from Gemini",
      status: 500,
    });
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return NextResponse.json({
      error: "Failed to generate trip plan",
      status: 500,
    });
  }
}
