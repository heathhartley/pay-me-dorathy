type Props = {
  onStart: (text: string) => void;
};

export default function Suggestions({ onStart }: Props) {
  const suggestions = [
    "What insights can I generate?",
    "Summarize my latest data",
    "Show engagement trends",
    "Analyze sentiment patterns",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onStart(s)}
          className="
            bg-gray-800 
            hover:bg-gray-700 
            transition 
            p-4 
            rounded-xl 
            text-sm 
            text-left
          "
        >
          {s}
        </button>
      ))}
    </div>
  );
}