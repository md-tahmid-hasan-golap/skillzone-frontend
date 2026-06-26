import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { title, category } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, message: "GEMINI_API_KEY is not set in .env" },
        { status: 500 },
      );
    }

    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a compelling, professional, and SEO-friendly description for a course or software titled "${title}" in the category "${category || "General"}". Keep it concise but engaging (around 1-2 paragraphs).`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ success: true, text });
  } catch (error: any) {
    console.error("Error generating description:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
