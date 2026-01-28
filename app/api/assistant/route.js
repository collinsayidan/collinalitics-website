// app/api/assistant/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT =
  "You are the Collinalitics AI assistant. You explain analytics, consulting, BI, and Collinalitics services clearly and professionally.";

function extractOutputText(data) {
  // Responses API returns an "output" array with "message" items,
  // whose "content" includes parts like { type: "output_text", text: "..." } :contentReference[oaicite:1]{index=1}
  const parts =
    data?.output?.flatMap((item) => item?.content ?? [])?.filter((c) => c?.type === "output_text") ??
    [];
  const text = parts.map((p) => p.text).join("\n").trim();
  return text;
}

export async function POST(req) {
  try {
    const { message } = await req.json().catch(() => ({}));

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "I didn't receive a message to respond to." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "Server is missing OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o";

    // timeout so requests don't hang forever
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        input: message,
        instructions: SYSTEM_PROMPT, // system/developer context :contentReference[oaicite:2]{index=2}
        // You can also add: max_output_tokens, temperature, etc.
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("OpenAI API error:", errText);
      return NextResponse.json(
        { reply: "I'm having trouble responding right now." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiReply = extractOutputText(data);

    return NextResponse.json({
      reply: aiReply || "I'm not sure how to answer that yet.",
    });
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    console.error("AI route error:", error);
    return NextResponse.json(
      { reply: isAbort ? "Request timed out. Please try again." : "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}