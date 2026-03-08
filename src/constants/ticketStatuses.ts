import type { TicketStatus } from "@/types/ticket.ts";

export const ticketStatuses: {
  label: string;
  value: TicketStatus | "all";
}[] = [
  { label: "Новые", value: "new" },
  { label: "Отклонены", value: "rejected" },
  { label: "На рассмотрении", value: "review" },
  { label: "В работе", value: "in_progress" },
  { label: "Ожидают запчасти", value: "waiting_parts" },
  { label: "Готовы", value: "ready" },
  { label: "Закрыты", value: "closed" },
  { label: "Все статусы", value: "all" },
];
