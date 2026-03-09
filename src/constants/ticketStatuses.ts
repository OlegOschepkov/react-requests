import type { TicketStatus } from "@/types/ticket.ts";

const ticketStatuses: {
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

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export { ticketStatuses, MAX_FILES, MAX_FILE_SIZE_MB, ALLOWED_FILE_TYPES };
