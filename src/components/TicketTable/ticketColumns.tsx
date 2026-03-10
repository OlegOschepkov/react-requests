import type { Ticket } from "@/types/ticket";
import { Text } from "@chakra-ui/react";
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
  statusMap,
} from "@/mockData/mockData.ts";
import React from "react";
import StatusBadge from "@/components/TicketTable/StatusBadge";
import PriorityBadge from "@/components/TicketTable/PriorityBadge.tsx";

type Column<Ticket> = {
  key: keyof Ticket;
  header: string;
  render: (ticket: Ticket) => React.ReactNode;
  filterType?: "select";
  options?: Record<string, string>;
};

export const ticketColumns: Column<Ticket>[] = [
  {
    key: "id",
    header: "ID",
    render: (ticket: Ticket) => ticket.id,
  },
  {
    key: "loc",
    header: "Локация",
    render: (ticket: Ticket) => (
      <>
        <Text as="span" bg="red">
          {ticket.loc.id}
        </Text>{" "}
        {ticket.loc.name}
      </>
    ),
  },
  {
    key: "about",
    header: "Описание",
    render: (ticket: Ticket) => ticket.about,
  },
  {
    key: "category",
    header: "Категория",
    render: (ticket: Ticket) => CATEGORY_LABELS[ticket.category],
    filterType: "select",
    options: CATEGORY_LABELS,
  },
  {
    key: "priority",
    header: "Приоритет",
    filterType: "select",
    options: PRIORITY_LABELS,
    render: (ticket: Ticket) => (
      <>
        <PriorityBadge status={ticket.priority} />
      </>
    ),
  },
  {
    key: "status",
    header: "Статус",
    render: (ticket: Ticket) => (
      <>
        <StatusBadge status={ticket.status} />
      </>
    ),
    filterType: "select",
    options: STATUS_LABELS,
  },
  {
    key: "createdAt",
    header: "Создана",
    render: (ticket: Ticket) =>
      `${ticket.createdAt.date} ${ticket.createdAt.time}`,
  },
];
