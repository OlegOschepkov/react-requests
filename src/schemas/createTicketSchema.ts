import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  CATEGORY_LABELS,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/mockData/mockData.ts";
import type { Category, PriorityStatus, TicketStatus } from "@/types/ticket.ts";

export const createTicketSchema = z.object({
  locId: z.string().min(1, "Выберите аптеку"),
  about: z.string().min(3, "Введите тему"),
  status: z.enum(
    Object.keys(STATUS_LABELS) as [TicketStatus, ...TicketStatus[]],
  ),
  category: z.enum(Object.keys(CATEGORY_LABELS) as [Category, ...Category[]]),
  priority: z.enum(
    Object.keys(PRIORITY_LABELS) as [PriorityStatus, ...PriorityStatus[]],
  ),
  description: z.string(),
  warranty: z.boolean().optional().default(false),
  files: z
    .array(z.instanceof(File))
    .max(MAX_FILES, `Можно загрузить максимум ${MAX_FILES} файлов`)
    .refine(
      (files) =>
        files.every((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
      `Максимальный размер файла ${MAX_FILE_SIZE_MB}MB`,
    )
    .refine(
      (files) =>
        files.every((file) =>
          (ALLOWED_FILE_TYPES as readonly string[]).includes(file.type),
        ),
      "Разрешены только JPG, PNG, WEBP",
    )
    .optional(),
});

export type CreateTicketForm = z.infer<typeof createTicketSchema>;
