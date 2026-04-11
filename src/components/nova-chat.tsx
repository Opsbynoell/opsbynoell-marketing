"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const mockConversation = [
  {
    from: "nova",
    text: "Hi! I\u2019m Nova, the first-response assistant for Ops by Noell. I can help you get started \u2014 are you looking to book a free audit, ask about our systems, or something else?",
  },
  {
    from: "visitor",
    text: "I keep missing calls during appointments. Can you help with that?",
  },
  {
    from: "nova",
    text: "Absolutely \u2014 that\u2019s exactly what we solve. When someone calls and you can\u2019t pick up, our system sends an instant text so the lead doesn\u2019t go cold. Can I grab your name and the best number to reach you? I\u2019ll connect you with Noell for a free audit.",
  },
  {
    from: "visitor",
    text: "Sarah, 512-555-1234",
  },
  {
    from: "nova",
    text: "Thanks Sarah! Here\u2019s a link to book your free audit directly: Book Now. You\u2019ll get a confirmation text right away. In the meantime, is there anything else I can help with?",
  },
];

export function NovaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* Floating Launcher */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-lilac-dark text-white shadow-lg shadow-lilac-dark/30 flex items-center justify-center hover:bg-lilac-dark/90 transition-all"
        aria-label="Open Nova chat"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl shadow-charcoal/10 border border-warm-border overflow-hidden flex flex-col max-h-[520px]">
          {/* Header */}
          <div className="bg-lilac-dark px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Nova</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <p className="text-[10px] text-white/60">
                  Prospect Assistant &middot; Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-cream/50">
            {mockConversation.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "visitor"
                      ? "bg-lilac-dark text-white rounded-br-md"
                      : "bg-white border border-warm-border text-charcoal rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-warm-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-9 px-3 text-sm bg-cream-dark rounded-lg border border-warm-border focus:outline-none focus:border-lilac-dark/50 text-charcoal placeholder:text-warm-gray/50"
              />
              <button className="w-9 h-9 rounded-lg bg-lilac-dark text-white flex items-center justify-center hover:bg-lilac-dark/90 transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] text-warm-gray/40 mt-2 text-center">
              Nova handles first response, qualification, and booking handoff.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
