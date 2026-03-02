import { useState, useEffect, useRef } from "react";
import type { Thread } from "../types";
import MessageBubble from "./MessageBubble";
import Suggestions from "./Suggestions";

type Props = {
  thread: Thread | null;
  onSendMessage: (content: string) => void;
  onStartNewThread: () => void;
};

export default function ChatWindow({ thread, onSendMessage }: Props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread?.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {(!thread || thread.messages.length === 0) ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Suggestions onStart={(text) => onSendMessage(text)} />
          </div>
        ) : (
          thread.messages.map(msg => <MessageBubble key={msg.id} message={msg} />)
        )}
      </div>

      <div className="border-t border-gray-800 p-4 flex gap-2 bg-gray-950">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-500 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}