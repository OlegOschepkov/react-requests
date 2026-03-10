export type TicketStatus =
  | "new"
  | "rejected"
  | "review"
  | "in_progress"
  | "waiting_parts"
  | "ready"
  | "closed";

export type PriorityStatus = "low" | "medium" | "high" | "critical";

export interface Ticket {
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
  priority: string;
  about: string;
  category: string;
  assignee: string;
  reactionTime: string;
  solution: string;
  status: TicketStatus;
}

export interface FormTicket {
  id: string;
  loc: {
    id: string;
    name: string;
  };
  about: string;
  status: TicketStatus;
  category: string;
  priority: string;
  createdAt: {
    date: string;
    time: string;
    dateTime: number; // in ms
  };
  description: string;
}
