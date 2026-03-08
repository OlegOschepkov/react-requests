import type { Ticket } from "@/types/ticket.ts";

export const mockTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Не работает кондиционер",
    client: "ООО Ромашка",
    createdAt: "2026-03-01",
    status: "new",
    assignee: "Иван",
  },
  {
    id: "T-1002",
    title: "Замена фильтра",
    client: "ООО Вектор",
    createdAt: "2026-03-02",
    status: "in_progress",
    assignee: "Петр",
  },
  {
    id: "T-1003",
    title: "Диагностика системы",
    client: "ООО Альфа",
    createdAt: "2026-03-03",
    status: "ready",
  },
  {
    id: "T-1004",
    title: "Переустановка касс",
    client: "ООО Альфа",
    createdAt: "2026-03-05",
    status: "in_progress",
  },
];

export const CURRENT_USER = "Олег";
