"use client";

import { useState } from "react";
import { askAI } from "@/app/dashboard/ai/actions";

const quickPrompts = [
  "How can I increase restaurant sales?",
  "Suggest a profitable combo meal.",
  "How can I reduce food waste?",
  "Give inventory management tips.",
  "How can I improve customer reviews?",
  "Suggest social media marketing ideas.",
];

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!question.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("prompt", question);

    try {
      const result = await askAI(formData);
      setAnswer(result);
    } catch {
      setAnswer("Unable to contact AI. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-4xl">

      <div className="rounded-xl border bg-white shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-2">
          🤖 PulseOS AI Assistant
        </h2>

        <p className="text-gray-500 mb-6">
          Ask for restaurant management, inventory, menu, marketing and business advice.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setQuestion(prompt)}
              className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: How can I increase restaurant profits this month?"
          className="w-full border rounded-xl p-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 rounded-lg bg-black text-white px-6 py-3 hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "🤔 Thinking..." : "🚀 Ask AI"}
        </button>

      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm p-6">

        <h3 className="text-xl font-semibold mb-4">
          💡 AI Response
        </h3>

        {answer ? (
          <div className="whitespace-pre-wrap leading-7">
            {answer}
          </div>
        ) : (
          <div className="text-gray-500">
            Ask a question or click one of the suggested prompts above.
          </div>
        )}

      </div>

    </div>
  );
}
