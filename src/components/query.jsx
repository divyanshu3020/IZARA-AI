import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function QueryPage() {
  const [query, setQuery] = useState("");
  const [behaviour, setBehaviour] = useState("You are a helpful assistant, and act like ...");
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const MODEL_NAME = "models/gemini-2.5-flash-lite";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent`;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setIsLoading(true);
    setBotResponse("");

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${behaviour}\n\n${query}` }] }],
          generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);

      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No response from model");

      setBotResponse(text);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pixel-bg min-h-screen w-full flex flex-col items-center justify-center text-green-300 relative overflow-hidden px-6 py-12">
      {/* Floating stars */}
      <div className="floating-objects">
        <div className="star"></div>
        <div className="star delay-1"></div>
        <div className="star delay-2"></div>
        <div className="star delay-3"></div>
        <div className="star delay-4"></div>
      </div>

      {/* Title */}
      <h1 className="minecraft-font text-3xl sm:text-4xl md:text-5xl text-green-400 drop-shadow-[0_0_25px_#22c55e] text-center mb-10 z-10">
        IZARA Query Console
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-4 relative z-10">
        {/* Behaviour input */}
        <section className="pixel-border flex flex-col gap-1 p-3">
          <label className="minecraft-font text-sm text-green-300">Behaviour</label>
          <input
            className="w-full p-2 bg-black/80 text-green-200 font-mono text-sm placeholder-gray-500 focus:outline-none"
            type="text"
            placeholder="e.g. You are a flirty assistant..."
            value={behaviour}
            onChange={(e) => setBehaviour(e.target.value)}
            disabled={isLoading}
          />
        </section>

        {/* Query input */}
        <section className="pixel-border flex flex-col gap-1 p-3">
          <label className="minecraft-font text-sm text-green-300">Your Query</label>
          <input
            className="w-full p-2 bg-black/80 text-green-200 font-mono text-sm placeholder-gray-500 focus:outline-none"
            type="text"
            placeholder="Type your question here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </section>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`pixel-btn py-2 text-sm ${
            isLoading || !query.trim() ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "⛏ Mining..." : "Submit"}
        </button>

        {/* Response */}
        <section className="pixel-border p-3 min-h-[120px]">
          <h2 className="minecraft-font text-sm text-green-300 mb-1">Response</h2>
          {isLoading ? (
            <p className="text-green-200 font-mono blink-cursor">⛏ Mining response</p>
          ) : error ? (
            <p className="text-red-400 font-mono">{error}</p>
          ) : botResponse ? (
            <div className="prose prose-invert max-w-none font-mono leading-relaxed text-green-200 text-sm">
              <ReactMarkdown>{botResponse}</ReactMarkdown>
            </div>
          ) : (
            <span className="text-gray-400 font-mono text-sm">Awaiting query...</span>
          )}
        </section>
      </form>
    </div>
  );
}
