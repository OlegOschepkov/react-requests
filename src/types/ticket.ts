export type TicketStatus =
  | "new"
  | "rejected"
  | "review"
  | "in_progress"
  | "waiting_parts"
  | "ready"
  | "closed";

export interface Ticket {
  id: string;
  title: string;
  client: string;
  createdAt: string;
  status: TicketStatus;
  assignee?: string;
}
