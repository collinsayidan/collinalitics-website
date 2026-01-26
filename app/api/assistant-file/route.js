import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { reply: "I didn't receive any file to work with." },
        { status: 400 }
      );
    }

    const fileName = file.name || "your file";

    const reply = `I’ve received **${fileName}**. Right now I can acknowledge uploads; we can extend this to analyse the file contents (e.g. summaries, insights, or checks) as a next step.`;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { reply: "Something went wrong while handling the file upload." },
      { status: 500 }
    );
  }
}
