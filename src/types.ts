export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Thread = {
  id: string;
  title: string;
  messages: Message[];
};