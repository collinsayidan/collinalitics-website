import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "I didn't receive a message to respond to." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are the Collinalitics AI assistant. You explain analytics, consulting, BI, and Collinalitics services clearly and professionally.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", await response.text());
      return NextResponse.json(
        { reply: "I'm having trouble responding right now." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiReply = data?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: aiReply || "I'm not sure how to answer that yet.",
    });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { reply: "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}
