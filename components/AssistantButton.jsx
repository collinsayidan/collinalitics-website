"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

export default function AssistantButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi, how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const pathname = usePathname();
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const suggestedPrompts = [
    "What services does Collinalitics offer",
    "Explain data analytics in simple terms",
    "How can Collinalitics help my business",
    "What makes Collinalitics different",
    "Help me choose the right BI solution",
  ];

  /* Close assistant when route changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Detect voice recognition support */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) setVoiceSupported(true);
    }
  }, []);

  /* Scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Click outside to close */
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /* Escape closes panel */
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
      if (!res.ok) return "I'm having trouble responding right now.";
      const data = await res.json();
      return typeof data?.reply === "string"
        ? data.reply
        : "I received your message, but couldn't format a reply.";
    } catch {
      return "Network error — please try again.";
    }
  }, []);

  const sendPrompt = async (prompt) => {
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setTyping(true);
    const reply = await callAssistantApi(prompt);
    setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
    setTyping(false);
  };

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setTyping(true);

    const reply = await callAssistantApi(userMessage);
    setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
    setTyping(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
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
            text:
              "I received the file, but something went wrong while processing it.",
          },
        ]);
      } else {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "assistant", text: data?.reply || "File processed." },
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
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsRecording(false);
      inputRef.current?.focus();
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full
          bg-collin-teal hover:bg-collin-lightTeal
          shadow-lg hover:shadow-collin-lightTeal/40
          flex items-center justify-center transition-all
        "
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {/* Chat Bubble Icon */}
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
      </button>

      {/* Assistant Panel */}
      {open && (
        <div
          ref={panelRef}
          className="
            fixed bottom-24 right-6 z-50
            w-80 sm:w-96 h-[26rem]
            bg-white border border-gray-200
            rounded-xl shadow-xl flex flex-col animate-slide-up
          "
          role="dialog"
          aria-modal="true"
          aria-label="Collinalitics Assistant"
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-collin-teal flex items-center justify-center">
                {/* Chat Bubble Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-collin-navy font-semibold text-sm">
                Collinalitics Assistant
              </h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xs"
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && !typing && (
            <div className="p-3 border-b border-gray-200 space-y-2">
              <p className="text-xs text-gray-500">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendPrompt(prompt)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition"
                    aria-label={`Use suggestion: ${prompt}`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.sender}-${i}-${msg.text.slice(0, 10)}`}
                className={`p-3 rounded-lg text-sm ${
                  msg.sender === "assistant"
                    ? "bg-collin-lightTeal/20 text-collin-navy"
                    : "bg-gray-100 text-gray-800 ml-auto"
                }`}
                style={{ maxWidth: "80%" }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-1 p-3 rounded-lg bg-collin-lightTeal/20 w-fit">
                <span
                  className="h-2 w-2 bg-collin-navy rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="h-2 w-2 bg-collin-navy rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="h-2 w-2 bg-collin-navy rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
                <span className="sr-only">Assistant is typing…</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.csv,.xlsx,.xls,.txt,.doc,.docx"
              aria-hidden="true"
              tabIndex={-1}
            />

            {/* File Upload Button */}
            <button
              onClick={handleFileButtonClick}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100"
              title="Upload a file"
              aria-label="Upload a file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79V7a5 5 0 00-10 0v10a3 3 0 006 0V8a1 1 0 00-2 0v9"
                />
              </svg>
            </button>

            {/* Voice Input Button */}
            {voiceSupported && (
              <button
                onClick={handleVoiceClick}
                className={`h-8 w-8 flex items-center justify-center rounded-lg border ${
                  isRecording
                    ? "border-red-400 bg-red-50 text-red-500"
                    : "border-gray-300 text-gray-500 hover:bg-gray-100"
                }`}
                title={isRecording ? "Listening…" : "Use voice input"}
                aria-pressed={isRecording}
                aria-label={isRecording ? "Stop voice input" : "Start voice input"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1a3 3 0 013 3v6a3 3 0 11-6 0V4a3 3 0 013-3zm0 14a7 7 0 007-7m-7 7a7 7 0 01-7-7m7 7v4m-3 0h6"
                  />
                </svg>
              </button>
            )}

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              placeholder="Ask me something…"
              aria-label="Type your message"
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="bg-collin-teal hover:bg-collin-lightTeal text-white px-3 py-2 rounded-lg transition flex items-center justify-center"
              title="Send message"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10l18-7-7 18-2-8-8-3z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
