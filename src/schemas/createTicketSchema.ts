import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/constants/ticketStatuses.ts";

export const createTicketSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  client: z.string().min(2, "Введите клиента"),
  status: z.string(),
  files: z
    .array(z.instanceof(File))
    .max(MAX_FILES, `Можно загрузить максимум ${MAX_FILES} файлов`)
    .refine(
      (files) =>
        files.every((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
      `Максимальный размер файла ${MAX_FILE_SIZE_MB}MB`,
    )
    .refine(
      (files) => files.every((file) => ALLOWED_FILE_TYPES.includes(file.type)),
      "Разрешены только JPG, PNG, WEBP",
    )
    .optional(),
});

export type CreateTicketForm = z.infer<typeof createTicketSchema>;
