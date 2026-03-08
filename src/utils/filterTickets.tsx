import type { Ticket, TicketStatus } from "@/types/ticket.ts";

interface Filters {
  status: TicketStatus | "all";
  query: string;
  onlyMy: boolean;
  currentUser: string;
}

const filterTickets = (tickets: Ticket[], filters: Filters) => {
  const query = filters.query.toLowerCase();

  return tickets.filter((ticket) => {
    const matchesStatus =
      filters.status === "all" || ticket.status === filters.status;

    const searchableFields = [
      ticket.id,
      ticket.title,
      ticket.client,
      ticket.assignee ?? "",
    ];

    const matchesSearch = searchableFields
      .join(" ")
      .toLowerCase()
      .includes(query);

    const matchesMy =
      !filters.onlyMy || ticket.assignee === filters.currentUser;

    return matchesStatus && matchesSearch && matchesMy;
  });
};

export default filterTickets;
