import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, message: "GEMINI_API_KEY is not set in .env" },
        { status: 500 },
      );
    }

    if (!message) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
    }

    // Leverage systemInstruction for identity and role
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are the SkillForge / SkillZone intelligent assistant. Provide concise, helpful, and professional support to users regarding courses and the platform.",
    });

    const formattedHistory: any[] = [];
    let finalMessageToSend = message;

    if (history && Array.isArray(history)) {
      // 1. Map frontend roles to Gemini roles
      const mappedHistory = history.map((msg: any) => ({
        role: msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.text || "" }],
      }));

      // 2. The first content MUST be 'user'. Find the first user message
      //    and discard any initial 'model' welcome messages that precede it.
      const firstUserIndex = mappedHistory.findIndex((m: any) => m.role === "user");

      const cleanedHistory = firstUserIndex !== -1 ? mappedHistory.slice(firstUserIndex) : [];

      // 3. Ensure roles alternate safely and do not have consecutive 'model' or 'user'
      let previousRole = "";
      for (const msg of cleanedHistory) {
        if (msg.role !== previousRole) {
          formattedHistory.push(msg);
          previousRole = msg.role;
        } else {
          // Merge consecutive messages from the same role
          if (formattedHistory.length > 0) {
            formattedHistory[formattedHistory.length - 1].parts[0].text += "\n" + msg.parts[0].text;
          }
        }
      }
    }

    // 4. Validation: startChat fails if history's last message is 'user'
    //    and we then immediately run sendMessage() which inherently is a 'user' message.
    if (
      formattedHistory.length > 0 &&
      formattedHistory[formattedHistory.length - 1].role === "user"
    ) {
      // Pop the last user message and merge it with our current message to send
      const lastMsg = formattedHistory.pop();
      if (!lastMsg.parts[0].text.endsWith(message)) {
        finalMessageToSend = lastMsg.parts[0].text + "\n" + message;
      }
    }

    // 5. Start chat with properly sequenced, validated history
    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(finalMessageToSend);
    const text = result.response.text();

    return NextResponse.json({ success: true, text });
  } catch (error: any) {
    console.error("Error in AI chat:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
