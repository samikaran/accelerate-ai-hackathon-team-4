"use client";

import React, { useState, useEffect } from "react";
import { Send, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
}

// Pigeon Icon Component
const PigeonIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    width="24"
    height="24"
    stroke="currentColor"
    fill="none"
  >
    <path
      d="M12 4c-2.5 0-5 1.5-5 4.5c0 2 2 3.5 4 3.5v3c-6-1-10-3-10-7C1 3.5 5.5 1 12 1c7.5 0 11 3 11 6.5c0 3.5-2.5 5.5-4.5 6.5L15 16.5V18c0 1-1 2-2 2h-2c-1 0-2-1-2-2v-1.5c0-1 1-2 2-2h2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const welcomeMessages = [
  "Hello! I'm Pigeon, your friendly AI companion. Just like a messenger pigeon, I'm here to deliver insights and help you navigate through your data! 📊",
  "Need help analyzing trends or understanding metrics? Let me spread my wings and assist you! 🕊️",
  "Whether it's market analysis, customer feedback, or cost metrics - I'm your reliable data messenger! What would you like to explore?",
];

const PigeonAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show random welcome message when opened
    if (isOpen && messages.length === 0) {
      const randomMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      setMessages([
        {
          content: randomMessage,
          type: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();

      if (!response.ok) {
        // throw new Error("Failed to get response");
        throw new Error(data.error || "Failed to get response");
      }

      const aiMessage: Message = {
        content: data.response,
        type: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        content:
          error instanceof Error && error.message.includes("rate limit")
            ? "I'm getting too many requests right now. Please try again in a moment! 🕊️"
            : "Oops! My wings got a bit tired. Let me catch my breath and try again! 🕊️",
        type: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 m-4">
      {!isOpen ? (
        <Button
          className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <PigeonIcon />
          <span>Ask Pigeon</span>
          <ChevronUp size={20} />
        </Button>
      ) : (
        <Card className="shadow-lg">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2">
              <PigeonIcon className="h-6 w-6" />
              <span className="font-medium">Pigeon Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              <ChevronDown size={20} />
            </Button>
          </div>

          <CardContent className="p-4">
            <div className="h-80 overflow-y-auto mb-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    Fluttering my wings... 🕊️
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Pigeon anything..."
                className="resize-none"
                rows={1}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PigeonAssistant;
