import React, { useState } from "react";
import { Mic, Send } from "lucide-react";

const MODES = {
  ANALYZE: "analyze_mood",
  CRISIS: "detect_crisis",
  SUMMARIZE: "summarize",
};

export default function App() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(MODES.ANALYZE);
  const [output, setOutput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
     const res = await fetch(`https://moodbotapi.onrender.com/${selected}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch {
      setOutput("❌ Error: Unable to connect to backend API.");
    }
    setInput("");
  };

  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onerror = recognition.onend = () => setListening(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen w-full bg-[#1f1f1f] text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">MoodBot</h1>

      <div className="w-full max-w-3xl">
        {/* Mode Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(MODES).map(([key, endpoint]) => (
            <button
              key={key}
              onClick={() => {
                setSelected(endpoint);
                setInput("");
                setOutput("");
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selected === endpoint
                  ? "bg-white text-black shadow"
                  : "border-zinc-600 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="min-h-[200px] bg-[#2b2b2b] border border-zinc-700 rounded-lg p-4 mb-6 text-sm whitespace-pre-wrap leading-relaxed overflow-auto">
          {output ? (
            <pre className="text-white">{output}</pre>
          ) : (
            <span className="text-zinc-500">Your response will appear here...</span>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center bg-[#2b2b2b] border border-zinc-700 rounded-lg px-4 py-2 shadow">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-zinc-500"
            placeholder={`Type something to ${selected.replace("_", " ")}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Mic
            className={`w-5 h-5 cursor-pointer ${
              listening ? "text-green-500 animate-pulse" : "text-zinc-400"
            } mr-3`}
            onClick={handleMic}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-white text-black hover:scale-105 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
