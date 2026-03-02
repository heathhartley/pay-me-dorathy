import type { Thread } from "../types";

type Props = {
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
};

export default function Sidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread
}: Props) {
  return (
    <aside className="w-72 bg-gray-950 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b mt-5 border-gray-800">
        <button
          onClick={onNewThread}
          className="w-full bg-blue-400 hover:bg-blue-500 transition rounded-lg py-2 font-medium"
        >
          + New Thread
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {threads.map(thread => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
              ${
                thread.id === activeThreadId
                  ? "bg-gray-800"
                  : "hover:bg-gray-800/60"
              }`}
          >
            {thread.title}
          </button>
        ))}
      </div>
    </aside>
  );
}