export type TicketStatus =
  | "new"
  | "rejected"
  | "review"
  | "in_progress"
  | "waiting_parts"
  | "ready"
  | "closed";

export type Category =
  | "cashbox"
  | "refrigerators"
  | "conditioner"
  | "measure"
  | "room"
  | "it"
  | "sanitary";

export type PriorityStatus = "low" | "medium" | "high" | "critical";
export type ReactionStatus = "ok" | "in_progress" | "alert";

export interface FormTicket {
  id: string;
  loc: {
    id: string;
    name: string;
  };
  createdAt: {
    date: string;
    time: string;
    dateTime: number; // in ms
  };
  priority: PriorityStatus;
  about: string;
  category: Category;
  status: TicketStatus;
  warranty?: boolean;
  description?: string;
}

export type Ticket = FormTicket & {
  assignee: string;
  reactionTime: string;
  solution: string;
  reactionStatus?: ReactionStatus;
  solutionStatus?: ReactionStatus;
};

export type SelectOption = {
  value: string;
  label: React.ReactNode;
};
