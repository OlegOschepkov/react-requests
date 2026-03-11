import type {
  Category,
  PriorityStatus,
  Ticket,
  TicketStatus,
} from "@/types/ticket.ts";
import { ChevronDown, ChevronsUp, ChevronUp, Diamond } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ===== ТИПЫ =====
interface StatusMapItem {
  label: string;
  color: string;
}

interface PriorityStatusItem {
  label: string;
  icon: LucideIcon;
  color: string;
}

interface FormLocValue {
  id: string;
  name: string;
}

interface TicketStatusOption {
  label: string;
  value: TicketStatus | "all";
}

// ===== МОК-ДАННЫЕ =====
const mockTickets: Ticket[] = [
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

// ===== ЛЕЙБЛЫ ДЛЯ ФИЛЬТРОВ =====
const STATUS_LABELS: Record<TicketStatus, string> = {
  new: "Новая",
  rejected: "Отклонены",
  review: "На рассмотрении",
  in_progress: "В работе",
  waiting_parts: "Ожидают запчасти",
  ready: "Готово",
  closed: "Закрыты",
};

const CATEGORY_LABELS: Record<Category, string> = {
  cashbox: "Кассы",
  refrigerators: "Холодильники",
  conditioner: "Кондиционеры",
  measure: "Изм. оборуд.",
  room: "Помещения",
  it: "ИТ",
  sanitary: "Сантехника",
};

const PRIORITY_LABELS: Record<PriorityStatus, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  critical: "Критич.",
};

// ===== КОНСТАНТЫ =====
const ROWS = 5;
const CURRENT_USER = "Олег";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

// ===== МАППИНГИ ДЛЯ UI =====
const statusMap: Record<TicketStatus, StatusMapItem> = {
  new: { label: "Новая", color: "blue" },
  rejected: { label: "Отклонена", color: "red" },
  review: { label: "На рассмотрении", color: "orange" },
  in_progress: { label: "В работе", color: "purple" },
  waiting_parts: { label: "Ожидает запчасти", color: "yellow" },
  ready: { label: "Готово", color: "green" },
  closed: { label: "Закрыта", color: "gray" },
};

const priorityStatuses: Record<PriorityStatus, PriorityStatusItem> = {
  low: { label: "Низкий", icon: ChevronDown, color: "red" },
  medium: { label: "Средний", icon: Diamond, color: "yellow.100" },
  high: { label: "Высокий", icon: ChevronUp, color: "red" },
  critical: { label: "Критич.", icon: ChevronsUp, color: "red" },
};

// ===== ДАННЫЕ ДЛЯ ФОРМ =====
const formLocValues: FormLocValue[] = [
  { id: "065", name: "Геленджик Островского 7" },
  { id: "150", name: "Кореновск Красная 108" },
  { id: "045", name: "Тимашевск Интернац 3Б" },
  { id: "164", name: "РнД Сельмаш 92" },
  { id: "190", name: "РнД Сельмаш 92" },
  { id: "267", name: "Анапа Парковая 67к2" },
];

// ===== СТАТУСЫ ДЛЯ ТАБЛИЦЫ =====
const ticketStatuses: TicketStatusOption[] = [
  { label: "Новые", value: "new" },
  { label: "Отклонены", value: "rejected" },
  { label: "На рассмотрении", value: "review" },
  { label: "В работе", value: "in_progress" },
  { label: "Ожидают запчасти", value: "waiting_parts" },
  { label: "Готовы", value: "ready" },
  { label: "Закрыты", value: "closed" },
  { label: "Все статусы", value: "all" },
];

export {
  ticketStatuses,
  MAX_FILES,
  MAX_FILE_SIZE_MB,
  ALLOWED_FILE_TYPES,
  formLocValues,
  priorityStatuses,
  statusMap,
  CURRENT_USER,
  ROWS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
  STATUS_LABELS,
  mockTickets,
};
