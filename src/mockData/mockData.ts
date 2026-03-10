import type { Ticket } from "@/types/ticket.ts";
import { ChevronDown, ChevronsUp, ChevronUp, Diamond } from "lucide-react";
import React from "react";

export const mockTickets: Ticket[] = [
  {
    id: "ХЛ-0002",
    loc: {
      id: "150",
      name: "Кореновск Красная 108",
    },
    createdAt: {
      date: "20.07.2025",
      time: "12:35:45",
      dateTime: 1753000545000,
    },
    priority: "medium",
    about: "Холодильник сильно гудит",
    category: "refrigerators",
    assignee: "Федоровский Н.",
    reactionTime: "05:01",
    solution: "01:35:34",
    status: "in_progress",
  },
];

export const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  rejected: "Отклонены",
  review: "На рассмотрении",
  in_progress: "В работе",
  waiting_parts: "Ожидают запчасти",
  ready: "Готово",
  closed: "Закрыты",
};

export const CATEGORY_LABELS: Record<string, string> = {
  cashbox: "Кассы",
  refrigerators: "Холодильники",
  conditioner: "Кондиционеры",
  measure: "Изм. оборуд.",
  room: "Помещения",
  it: "ИТ",
  sanitary: "Сантехника",
};

export const PRIORITY_LABELS: Record<string, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  critical: "Критич.",
};

export const ROWS = 5;

export const CURRENT_USER = "Олег";

export const statusMap = {
  new: { label: "Новая", color: "blue" },
  rejected: { label: "Отклонена", color: "red" },
  review: { label: "На рассмотрении", color: "orange" },
  in_progress: { label: "В работе", color: "purple" },
  waiting_parts: { label: "Ожидает запчасти", color: "yellow" },
  ready: { label: "Готово", color: "green" },
  closed: { label: "Закрыта", color: "gray" },
};

export const priorityStatuses = {
  low: { label: "Низкий", icon: ChevronDown, color: "nokColor" },
  medium: { label: "Средний", icon: Diamond, color: "goldColor" },
  high: { label: "Высокий", icon: ChevronUp, color: "nokColor" },
  critical: { label: "Критич.", icon: ChevronsUp, color: "nokColor" },
};

export const formLocValues = [
  {
    id: "065",
    name: "Геленджик Островского 7",
  },
  {
    id: "150",
    name: "Кореновск Красная 108",
  },
  {
    id: "045",
    name: "Тимашевск Интернац 3Б",
  },
  {
    id: "164",
    name: "РнД Сельмаш 92",
  },
  {
    id: "190",
    name: "РнД Сельмаш 92",
  },
  {
    id: "267",
    name: "Анапа Парковая 67к2",
  },
];

console.log(new Date().toISOString());
