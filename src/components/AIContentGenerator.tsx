"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function AIContentGenerator({ category = "General" }: { category?: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { userId } = useAuth();

  const handleGenerate = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/ai/generate-description",
        { title, category },
        { headers: { "x-clerk-user-id": userId } },
      );
      if (response.data.success) {
        setDescription(response.data.text);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card w-full max-w-2xl border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Content Generator</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Course / Item Title</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced TypeScript Patterns"
              className="flex-1 bg-background border border-input rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-foreground"
            />
            <button
              onClick={handleGenerate}
              disabled={!title || loading}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>
        </div>

        <div className="space-y-1.5 relative">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">AI Generated Description</label>
            {description && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="AI generated content will appear here..."
            className="w-full h-40 bg-background border border-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-foreground resize-none"
          />
        </div>
      </div>
    </div>
  );
}
