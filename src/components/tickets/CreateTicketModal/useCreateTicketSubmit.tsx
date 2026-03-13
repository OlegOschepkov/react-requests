import { formLocValues } from "@/mockData/mockData";
import { formatCreatedAt } from "@/utils/dateFormat";
import type { CreateTicketForm } from "@/schemas/createTicketSchema";
import type { FormTicket } from "@/types/ticket";

export const createTicketFromForm = (data: CreateTicketForm): FormTicket => {
  const selectedLoc = formLocValues.find((loc) => loc.id === data.locId);

  if (!selectedLoc) {
    throw new Error("Location not found");
  }

  return {
    id: `T-${Date.now()}`.slice(-4),
    loc: selectedLoc,
    about: data.about,
    category: data.category,
    priority: data.priority,
    description: data.description,
    status: "new",
    warranty: data.warranty,
    createdAt: formatCreatedAt(),
  };
};
