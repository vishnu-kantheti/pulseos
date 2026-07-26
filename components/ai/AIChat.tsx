"use client";

import { useState } from "react";
import { askAI } from "@/app/dashboard/ai/actions";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!question.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("prompt", question);

    const result = await askAI(formData);

    setAnswer(result);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl space-y-5">

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask PulseOS AI anything..."
        className="w-full border rounded-lg p-4 h-40"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="border rounded-lg p-5 whitespace-pre-wrap">
          {answer}
        </div>
      )}

    </div>
  );
}
