import type { Ticket } from "@/types/ticket.ts";
import { Text } from "@chakra-ui/react";
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/mockData/mockData.ts";
import React from "react";
import StatusBadge from "@/components/tickets/TicketTable/StatusBadge.tsx";
import PriorityBadge from "@/components/tickets/TicketTable/PriorityBadge.tsx";

type Column<Ticket> =
  | {
      key: keyof Ticket;
      header: string;
      render: (row: Ticket) => React.ReactNode;
      filterType?: undefined;
      options?: undefined;
    }
  | {
      key: keyof Ticket;
      header: string;
      render: (row: Ticket) => React.ReactNode;
      filterType: "select";
      options: Record<string, string>;
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
    key: "createdAt",
    header: "Создана",
    render: (ticket: Ticket) =>
      `${ticket.createdAt.date} ${ticket.createdAt.time}`,
  },
  {
    key: "priority",
    header: "Приоритет",
    filterType: "select",
    options: PRIORITY_LABELS,
    render: (ticket: Ticket) => <PriorityBadge status={ticket.priority} />,
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
    key: "assignee",
    header: "Создана",
    render: (ticket: Ticket) => ticket.assignee,
  },
  {
    key: "reactionTime",
    header: "Реакция",
    render: (ticket: Ticket) => ticket.reactionTime,
  },
  {
    key: "solution",
    header: "Решение",
    render: (ticket: Ticket) => ticket.solution,
  },
  {
    key: "status",
    header: "Статус",
    filterType: "select",
    options: STATUS_LABELS,
    render: (ticket: Ticket) => <StatusBadge status={ticket.status} />,
  },
];
