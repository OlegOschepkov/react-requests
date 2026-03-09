import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  client: z.string().min(2, "Введите клиента"),
  status: z.string(),
});

export type CreateTicketForm = z.infer<typeof createTicketSchema>;
