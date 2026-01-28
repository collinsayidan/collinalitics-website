"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

/**
 * Collinalitics Assistant — premium UI/UX
 * ✅ FIX: Panel always pops on the RIGHT (no left-anchored mobile sheet classes)
 */

export default function AssistantButton() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi — I’m the Collinalitics assistant. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  const suggestedPrompts = useMemo(
    () => [
      "What services does Collinalitics offer?",
      "Explain analytics engineering in simple terms.",
      "How can you help a UK organisation improve reporting?",
      "What’s the difference between BI dashboards and analytics engineering?",
      "Help me choose the right BI solution.",
    ],
    []
  );

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(!!mq?.matches);
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  // Voice recognition support
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, typing, open, reduceMotion]);

  // Focus input on open
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // Click outside closes (desktop)
  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // ESC closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const callAssistantApi = useCallback(async (message) => {
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok)
        return "I’m having trouble responding right now. Please try again.";
      const data = await res.json();
      return typeof data?.reply === "string"
        ? data.reply
        : "I received your message, but couldn’t format a reply.";
    } catch {
      return "Network error — please try again.";
    }
  }, []);

  const sendPrompt = useCallback(
    async (prompt) => {
      setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
      setTyping(true);
      const reply = await callAssistantApi(prompt);
      setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
      setTyping(false);
    },
    [callAssistantApi]
  );

  const sendMessage = useCallback(async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setTyping(true);

    const reply = await callAssistantApi(userMessage);
    setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
    setTyping(false);
  }, [input, callAssistantApi]);

  const handleInputKeyDown = (e) => {
    // Enter sends; Shift+Enter adds newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileButtonClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: `Uploaded file: **${file.name}** (${Math.round(
          file.size / 1024
        )} KB)`,
      },
    ]);
    setTyping(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/assistant-file", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "I received the file, but something went wrong while processing it.",
          },
        ]);
      } else {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "assistant", text: data?.reply || "File received." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "There was an error uploading the file." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleVoiceClick = () => {
    if (!voiceSupported) return;

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsRecording(false);
      inputRef.current?.focus();
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const startNewChat = () => {
    setMessages([
      { sender: "assistant", text: "Hi — what would you like to explore today?" },
    ]);
    setInput("");
    setTyping(false);
    inputRef.current?.focus();
  };

  const downloadTranscript = () => {
    try {
      const lines = messages
        .map((m) => `${m.sender.toUpperCase()}: ${stripMarkdown(m.text)}`)
        .join("\n\n");

      const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "collinalitics-assistant-transcript.txt";
      a.click();

      URL.revokeObjectURL(url);
    } catch {}
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "fixed bottom-6 right-6 z-[70]",
          "h-14 w-14 rounded-full",
          "bg-collin-teal hover:bg-collin-lightTeal",
          "shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_40px_rgba(0,151,167,0.28)]",
          "flex items-center justify-center",
          "transition-all",
          "focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-collin-navy",
        ].join(" ")}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        aria-controls="collinalitics-assistant-panel"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {/* Overlay (tap outside closes) */}
      {open && (
        <button
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
          aria-label="Close assistant overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Assistant Panel — ✅ ALWAYS RIGHT */}
      {open && (
        <div
          ref={panelRef}
          id="collinalitics-assistant-panel"
          className={[
            "fixed z-[80] overflow-hidden",
            "right-6 bottom-24",
            // width/height responsive but still right-anchored
            "w-[min(92vw,26rem)] h-[30rem]",
            "rounded-2xl",
            "bg-white border border-gray-200",
            "shadow-[0_18px_60px_rgba(0,0,0,0.20)]",
            "flex flex-col",
            reduceMotion ? "" : "animate-[assistIn_0.22s_ease-out]",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Collinalitics Assistant"
          onClick={(e) => e.stopPropagation()} // prevent overlay click closing when clicking inside
        >
          {/* Header */}
          <div className="relative border-b border-gray-200 bg-white/90 backdrop-blur-md">
            <div className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-collin-teal text-white flex items-center justify-center shadow-sm">
                  <SparkIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-collin-navy truncate">
                    Collinalitics Assistant
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Analytics • BI • Systems • AI • UX
                  </p>
                </div>
              </div>

              {/* ✅ Close button stays top-right */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={startNewChat}
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  <PlusMini />
                  New
                </button>

                <button
                  type="button"
                  onClick={downloadTranscript}
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  aria-label="Download chat transcript"
                  title="Download transcript"
                >
                  <DownloadMini />
                  Export
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition"
                  aria-label="Close assistant"
                  title="Close"
                >
                  <CloseMini />
                </button>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-collin-teal via-collin-lightTeal to-collin-teal"
            />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && !typing && (
            <div className="border-b border-gray-200 bg-gray-50/70">
              <div className="px-4 py-3">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Suggested
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendPrompt(prompt)}
                      className={[
                        "text-xs",
                        "rounded-full px-3 py-1.5",
                        "border border-gray-200 bg-white",
                        "text-gray-700 hover:text-collin-navy",
                        "hover:border-collin-teal/40 hover:bg-collin-teal/5",
                        "transition",
                      ].join(" ")}
                      aria-label={`Use suggestion: ${prompt}`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => {
              const isAssistant = msg.sender === "assistant";
              return (
                <div
                  key={`${msg.sender}-${i}-${msg.text.slice(0, 12)}`}
                  className={["flex", isAssistant ? "justify-start" : "justify-end"].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      isAssistant
                        ? "bg-collin-lightTeal/15 text-collin-navy border border-collin-teal/10"
                        : "bg-gray-900 text-white border border-black/10",
                      "shadow-[0_6px_22px_rgba(0,0,0,0.06)]",
                    ].join(" ")}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            className="underline font-semibold"
                            target="_blank"
                            rel="noreferrer"
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong {...props} className="font-semibold" />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul {...props} className="list-disc pl-5 space-y-1" />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol {...props} className="list-decimal pl-5 space-y-1" />
                        ),
                        p: ({ node, ...props }) => (
                          <p {...props} className="whitespace-pre-wrap" />
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}

            {typing && <TypingBubble />}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer input */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 pt-3 pb-2">
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Please avoid sharing sensitive personal data. For policies, see{" "}
                <a
                  href="/privacy-policy"
                  className="text-collin-teal font-semibold hover:underline"
                >
                  Privacy
                </a>{" "}
                and{" "}
                <a
                  href="/cookies"
                  className="text-collin-teal font-semibold hover:underline"
                >
                  Cookies
                </a>
                .
              </p>
            </div>

            <div className="px-4 pb-4 flex items-end gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.md,.csv,.json"
                aria-hidden="true"
                tabIndex={-1}
              />

              <button
                type="button"
                onClick={handleFileButtonClick}
                className={[
                  "h-10 w-10 rounded-xl border border-gray-200",
                  "bg-white text-gray-600 hover:bg-gray-50",
                  "transition flex items-center justify-center",
                  "focus:outline-none focus:ring-2 focus:ring-collin-teal/30",
                ].join(" ")}
                title="Upload a file"
                aria-label="Upload a file"
              >
                <PaperclipIcon />
              </button>

              {voiceSupported && (
                <button
                  type="button"
                  onClick={handleVoiceClick}
                  className={[
                    "h-10 w-10 rounded-xl border",
                    isRecording
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                    "transition flex items-center justify-center",
                    "focus:outline-none focus:ring-2 focus:ring-collin-teal/30",
                  ].join(" ")}
                  title={isRecording ? "Listening…" : "Voice input"}
                  aria-pressed={isRecording}
                  aria-label={isRecording ? "Stop voice input" : "Start voice input"}
                >
                  <MicIcon />
                </button>
              )}

              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  rows={1}
                  className={[
                    "w-full resize-none",
                    "rounded-2xl border border-gray-200",
                    "bg-gray-50/70 px-4 py-3",
                    "text-sm text-gray-900 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-collin-teal/25 focus:border-collin-teal/40",
                    "leading-relaxed",
                  ].join(" ")}
                  placeholder="Ask about services, BI dashboards, analytics engineering…"
                  aria-label="Type your message"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Press <span className="font-semibold">Enter</span> to send •{" "}
                  <span className="font-semibold">Shift</span>+<span className="font-semibold">Enter</span>{" "}
                  for a new line
                </p>
              </div>

              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className={[
                  "h-10 w-10 rounded-xl",
                  "bg-collin-teal text-white",
                  "hover:opacity-95 transition",
                  "flex items-center justify-center",
                  "shadow-[0_10px_22px_rgba(0,151,167,0.24)]",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-collin-teal/30",
                ].join(" ")}
                title="Send"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {!reduceMotion && (
            <style jsx>{`
              @keyframes assistIn {
                0% {
                  opacity: 0;
                  transform: translateY(10px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes dot {
                0%,
                80%,
                100% {
                  transform: translateY(0);
                  opacity: 0.55;
                }
                40% {
                  transform: translateY(-4px);
                  opacity: 1;
                }
              }
            `}</style>
          )}
        </div>
      )}
    </>
  );
}

/* ------------------ UI bits ------------------ */

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-collin-lightTeal/15 text-collin-navy border border-collin-teal/10 shadow-[0_6px_22px_rgba(0,0,0,0.06)] rounded-2xl px-4 py-3 w-fit">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-collin-navy/70"
            style={{ animation: "dot 1.1s infinite ease-in-out" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-collin-navy/70"
            style={{ animation: "dot 1.1s 0.15s infinite ease-in-out" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-collin-navy/70"
            style={{ animation: "dot 1.1s 0.3s infinite ease-in-out" }}
          />
          <span className="sr-only">Assistant is typing…</span>
        </div>
      </div>
    </div>
  );
}

function stripMarkdown(md) {
  return String(md || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/* ------------------ Icons ------------------ */

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-7 w-7 text-white"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 2l1.2 4.3L15.5 8l-4.3 1.2L10 13.5 8.8 9.2 4.5 8l4.3-1.7L10 2z" />
      <path d="M4 11l.8 2.7L7.5 15l-2.7.8L4 18l-.8-2.2L1 15l2.2-.3L4 11z" />
    </svg>
  );
}

function CloseMini() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79V7a5 5 0 00-10 0v10a3 3 0 006 0V8a1 1 0 00-2 0v9" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 013 3v6a3 3 0 11-6 0V4a3 3 0 013-3zm0 14a7 7 0 007-7m-7 7a7 7 0 01-7-7m7 7v4m-3 0h6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l18-7-7 18-2-8-8-3z" />
    </svg>
  );
}

function PlusMini() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
    </svg>
  );
}

function DownloadMini() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
      <path d="M9 3a1 1 0 112 0v7l2.3-2.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L9 10V3z" />
    </svg>
  );
}
