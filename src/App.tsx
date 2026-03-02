import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import type { Thread } from "./types";

export default function App() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  const createNewThread = () => {
    const newThread: Thread = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
  };

  const sendMessage = (content: string) => {
    if (!activeThreadId) {
      // create thread with first message
      const newThread: Thread = {
        id: uuidv4(),
        title: content.length > 40 ? content.slice(0, 37) + "..." : content,
        messages: [
          {
            id: uuidv4(),
            role: "user",
            content,
          },
        ],
      };
      setThreads([newThread]);
      setActiveThreadId(newThread.id);
      // Add assistant response after user message
      setTimeout(() => {
        addAssistantReply(newThread.id, "Nathan, You Suck!");
      }, 1000);
      return;
    }

    // Add user message
    setThreads(prevThreads =>
      prevThreads.map(thread => {
        if (thread.id !== activeThreadId) return thread;
        const isFirst = thread.messages.length === 0;
        return {
          ...thread,
          title: isFirst
            ? content.length > 40 ? content.slice(0, 37) + "..." : content
            : thread.title,
          messages: [
            ...thread.messages,
            { id: uuidv4(), role: "user", content },
          ],
        };
      })
    );

    // Simulate assistant reply
    setTimeout(() => {
      addAssistantReply(activeThreadId, "You Suck, Nathan");
    }, 1000);
  };

  const addAssistantReply = (threadId: string, content: string) => {
    setThreads(prev =>
      prev.map(thread =>
        thread.id !== threadId
          ? thread
          : {
              ...thread,
              messages: [
                ...thread.messages,
                { id: uuidv4(), role: "assistant", content },
              ],
            }
      )
    );
  };

  return (
    <div className="h-full flex bg-white text-gray-100">
      <Sidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewThread={createNewThread}
      />

      <main className="flex-1 flex justify-center items-center">
        <div className="w-7/8 h-7/8 border rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <ChatWindow
            thread={activeThread}
            onSendMessage={sendMessage}
            onStartNewThread={createNewThread}
          />
        </div>
      </main>
    </div>
  );
}