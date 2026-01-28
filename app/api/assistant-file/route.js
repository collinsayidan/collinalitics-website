// app/api/assistant-file/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
  // optionally allow PDFs/images if you want later:
  // "application/pdf",
  // "image/png",
  // "image/jpeg",
]);

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { reply: "Expected a multipart/form-data upload." },
        { status: 415 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    // Next.js gives you a File (Blob-like) object
    if (!file || typeof file !== "object" || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { reply: "I didn't receive any file to work with." },
        { status: 400 }
      );
    }

    const fileName = file.name || "uploaded-file";
    const fileType = file.type || "application/octet-stream";
    const fileSize = Number(file.size || 0);

    if (fileSize <= 0) {
      return NextResponse.json({ reply: "That file looks empty." }, { status: 400 });
    }

    if (fileSize > MAX_BYTES) {
      return NextResponse.json(
        { reply: `File is too large. Max allowed is ${Math.round(MAX_BYTES / 1024 / 1024)}MB.` },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(fileType)) {
      return NextResponse.json(
        {
          reply: `Unsupported file type (${fileType}). Please upload a .txt, .md, .csv, or .json file.`,
        },
        { status: 415 }
      );
    }

    // If you later want to read contents (for txt/csv/json), you can do:
    // const buf = Buffer.from(await file.arrayBuffer());
    // const text = buf.toString("utf-8");

    return NextResponse.json({
      reply: `✅ Received **${fileName}** (${fileType}, ${(fileSize / 1024).toFixed(
        1
      )}KB). I can currently acknowledge uploads — next we can add summaries, insights, validation checks, or extraction.`,
      meta: { fileName, fileType, fileSize },
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { reply: "Something went wrong while handling the file upload." },
      { status: 500 }
    );
  }
}