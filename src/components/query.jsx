import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function QueryPage() {
  const [query, setQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setIsLoading(true);
    setBotResponse("");

    try {
      const response = await axios.post(`http://localhost:3000/query/res`, {
        question: query,
      });

      setBotResponse(response?.data || "No response received");
    } catch (err) {
      console.error("API Error:", err);

      setError("Failed to get response. Please try again.");
      setBotResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10 bg-gradient-to-tr from-gray-900 via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg mb-10 text-center">
        Ask your Query
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col items-center gap-6">
        <input
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base sm:text-lg placeholder-gray-400 transition duration-200"
          type="text"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Ask your question"
          aria-describedby="query-help"
        />

        <p id="query-help" className="sr-only">
          Enter your question and press submit
        </p>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`w-full py-3 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition duration-200 ${
            isLoading || !query.trim()
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-green-600 hover:bg-green-700"
          }`}
          aria-busy={isLoading} 
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>

        {/* Changed: Dynamic styling based on state */}
        <div
          className={`w-full min-h-[150px] rounded-xl p-6 border backdrop-blur-md text-left shadow-md transition-all duration-300 ${
            error
              ? "bg-red-900/30 border-red-700" 
              : "bg-gray-800/60 border-gray-700"
          }`}
          aria-live="polite"
        >
          {isLoading ? (
            // Loading indicator
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            // Error display
            <p className="text-red-300">{error}</p>
          ) : botResponse ? (
            // Better markdown styling
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{botResponse}</ReactMarkdown>
            </div>
          ) : (
            // More descriptive empty state
            <span className="text-gray-400 text-center block">
              Your response will appear here...
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
