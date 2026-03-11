import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/mockData/mockData.ts";

export const createTicketSchema = z.object({
  locId: z.string().min(1, "Выберите аптеку"),
  about: z.string().min(3, "Введите тему"),
  status: z.string().min(1, "Выберите статус"),
  category: z.string().min(1, "Выберите категорию"),
  priority: z.string().min(1, "Выберите приоритет"),
  description: z.string(),
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
