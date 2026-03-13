import type { Ticket, TicketStatus } from "@/types/ticket.ts";

interface Filters {
  status: TicketStatus | "all";
  query: string;
  currentUser: string;
}

const filterTickets = (tickets: Ticket[], filters: Filters) => {
  const query = filters.query.toLowerCase();

  return tickets.filter((ticket) => {
    const matchesStatus =
      filters.status === "all" || ticket.status === filters.status;

    const searchableFields = [
      // указываем только доступные пользователю поля
      ticket.id,
      ticket.loc.id,
      ticket.loc.name,
      ticket.createdAt.date,
      ticket.createdAt.time,
      ticket.priority,
      ticket.about,
      ticket.category,
      ticket.assignee ?? "",
      ticket.reactionTime,
      ticket.solution ?? "",
      ticket.status,
    ];

    const matchesSearch = searchableFields
      .join(" ")
      .toLowerCase()
      .includes(query);

    return matchesStatus && matchesSearch;
  });
};

export default filterTickets;
