"use client";
import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Settings } from "lucide-react";
import Markdown from "marked-react";

import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

import { ChatRequest } from "./api/stream/route";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [userPreference, setUserPreference] = useState<
    ChatRequest["userPreferences"] | undefined
  >();

  useEffect(() => {
    const data = localStorage.getItem("userPreferences");
    if (data) {
      setUserPreference(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  async function sendQuery(
    params: ChatRequest,
    callback: (message: string) => void
  ) {
    const res = await fetch("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params as ChatRequest),
    });

    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let ai = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      ai += decoder.decode(value);
      callback(ai);
    }
  }

  async function send() {
    if (!input.trim()) return;
    const user = input.trim();
    setMessages((prev) => [...prev, user]);
    setInput("");

    // get the last 2 messages
    const lastTwoMessages = messages.slice(-2);

    setMessages((prev) => [...prev, ""]);
    await sendQuery(
      {
        message: user,
        userPreferences: userPreference,
        history: lastTwoMessages,
      },
      (message) => {
        // This callback is used to update the messages state
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = message;
          return copy;
        });
      }
    );
  }

  const onOnBoardingComplete = async (data: ChatRequest["userPreferences"]) => {
    setUserPreference(data);
    localStorage.setItem("userPreferences", JSON.stringify(data));

    const newMessage =
      "I'm ready to chat to start my travel planning tell me what I can do";

    setMessages((prev) => [...prev, newMessage, ""]);
    await sendQuery(
      {
        message: newMessage,
        userPreferences: data,
        history: [],
      },
      (message) => {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = message;
          return copy;
        });
      }
    );
  };

  const cleanPreference = () => {
    setUserPreference(undefined);
    localStorage.removeItem("userPreferences");
    setMessages([]);
  };

  return (
    <div className="fixed  mb-6 w-[100dvw] h-[100dvh] flex flex-col rounded-lg shadow-lg  bg-white dark:bg-gray-900">
      {!userPreference && <OnboardingFlow onComplete={onOnBoardingComplete} />}
      <button
        onClick={cleanPreference}
        className="fixed top-4 left-4 cursor-pointer"
      >
        <Settings />
      </button>

      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm flex flex-col align-center justify-center w-[50%] self-center scrollbar">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] mt-8 break-words ${
              i % 2 === 0
                ? "self-end max-w-[500px] bg-blue-600 text-white bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "self-start text-gray-900 bg-transparent dark:text-gray-50 "
            } rounded-md px-3 py-1`}
          >
            <Markdown>{m}</Markdown>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-3 overflow-y-auto space-y-2 text-sm flex flex-col align-center justify-center w-[50%] self-center">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message"
            className="border border-background"
          />
          <button
            onClick={send}
            className="absolute right-0 top-0 h-full px-3 cursor-pointer"
          >
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
}
