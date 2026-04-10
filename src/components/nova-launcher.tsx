"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";

type Message = {
  role: "nova" | "user";
  text: string;
};

const mockResponses: Record<string, string> = {
  default:
    "Hi! I'm Nova, the AI assistant for Ops by Noell. I can help you learn about our systems, book an audit, or answer questions about how we help local businesses. What can I help with?",
  pricing:
    "Our Launch plan starts at $2,500 setup + $297/mo, and our Growth plan is $4,500 setup + $497/mo. Both include a complete done-for-you build. Want me to help you book a free audit to find the right fit?",
  booking:
    "I'd love to help you get started! You can book a free 30-minute audit at opsbynoell.com/book. We'll walk through where leads are slipping and what to fix first. No pitch, just clarity.",
  systems:
    "We build four core systems: Instant Lead Response, Automated Booking & Confirmation, Follow-Up & Reactivation, and Review & Reputation Engine. Each one is designed to recover revenue your business is losing to slow response and manual follow-up.",
  nova: "That's me! I'm an AI assistant that can be trained on your business — your services, pricing, and voice. I handle first contact, qualification, and booking 24/7. Want to see how I'd work for your business?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much"))
    return mockResponses.pricing;
  if (lower.includes("book") || lower.includes("audit") || lower.includes("start") || lower.includes("schedule"))
    return mockResponses.booking;
  if (lower.includes("system") || lower.includes("how") || lower.includes("work") || lower.includes("what do"))
    return mockResponses.systems;
  if (lower.includes("nova") || lower.includes("ai") || lower.includes("assistant") || lower.includes("you"))
    return mockResponses.nova;
  return "That's a great question! For the most detailed answer, I'd recommend booking a free audit where we can walk through everything specific to your business. Would you like me to help with that?";
}

export function NovaLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "nova", text: mockResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "nova", text: getResponse(userMessage) },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] bg-white border border-charcoal/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-nova-purple flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cream" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cream">Nova</p>
              <p className="text-xs text-cream/60">AI Assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cream/60 hover:text-cream transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[340px]"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-nova-purple text-cream rounded-br-sm"
                      : "bg-charcoal/5 text-charcoal rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-charcoal/5 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-charcoal/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nova anything..."
                className="flex-1 bg-charcoal/5 rounded-full px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-nova-purple/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-nova-purple text-cream flex items-center justify-center hover:bg-nova-purple-light transition-colors disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-nova-purple text-cream shadow-lg hover:bg-nova-purple-light hover:scale-105 transition-all flex items-center justify-center"
        aria-label={isOpen ? "Close Nova chat" : "Open Nova chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Sparkles className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
