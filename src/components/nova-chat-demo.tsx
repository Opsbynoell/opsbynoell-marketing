"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

type Message = {
  role: "nova" | "visitor";
  text: string;
  typing?: boolean;
};

const demoConversation: Message[] = [
  { role: "visitor", text: "Hi, do you have availability this week for Botox?" },
  {
    role: "nova",
    text: "Hi! Yes, we have openings this week. We offer Botox starting at $12/unit with our certified injectors. Would you like to book a consultation?",
  },
  { role: "visitor", text: "Yes please, what times work?" },
  {
    role: "nova",
    text: "I have Tuesday at 2:00 PM, Wednesday at 10:30 AM, or Thursday at 4:00 PM. Which works best for you?",
  },
  { role: "visitor", text: "Wednesday at 10:30 works" },
  {
    role: "nova",
    text: "You're booked for Wednesday at 10:30 AM. I've sent a confirmation to your phone and email. You'll get a reminder 24 hours before and 2 hours before your appointment. Is there anything else I can help with?",
  },
];

export function NovaChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= demoConversation.length) return;

    const message = demoConversation[currentIndex];
    const delay = currentIndex === 0 ? 1000 : message.role === "nova" ? 1500 : 800;

    const timer = setTimeout(() => {
      if (message.role === "nova") {
        setIsTyping(true);
        const typeTimer = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, message]);
          setCurrentIndex((prev) => prev + 1);
        }, 1200);
        return () => clearTimeout(typeTimer);
      } else {
        setVisibleMessages((prev) => [...prev, message]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
      {/* Chat header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-nova-purple" />
        </div>
        <div>
          <p className="text-sm font-medium text-cream">Nova</p>
          <p className="text-xs text-cream/40">Always online</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="p-5 space-y-4 h-[360px] overflow-y-auto">
        {visibleMessages.length === 0 && !isTyping && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-cream/30 italic">
              Starting conversation...
            </p>
          </div>
        )}

        {visibleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "visitor" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "visitor"
                  ? "bg-cream text-charcoal rounded-br-sm"
                  : "bg-white/10 text-cream/90 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input (decorative) */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="bg-white/5 rounded-full px-4 py-2.5 text-sm text-cream/30">
          Type a message...
        </div>
      </div>
    </div>
  );
}
