import type { Ticket } from "@/types/ticket.ts";

import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/mockData/mockData.ts";
import React from "react";
import StatusBadge from "@/components/tickets/TicketTable/StatusBadge.tsx";
import PriorityBadge from "@/components/tickets/TicketTable/PriorityBadge.tsx";
import ReactionBadge from "@/components/tickets/TicketTable/ReactionBadge.tsx";
import CustomText from "@/components/ui/custom-text.tsx";

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
    header: "№",
    render: (ticket: Ticket) => ticket.id,
  },
  {
    key: "loc",
    header: "Аптека",
    render: (ticket: Ticket) => (
      <>
        <CustomText
          as="span"
          bg="grey.50"
          borderRadius="4px"
          fontWeight="600"
          letterSpacing="8%"
          padding="1px 3px"
          marginRight="9px"
        >
          {ticket.loc.id}
        </CustomText>
        {ticket.loc.name}
      </>
    ),
  },
  {
    key: "createdAt",
    header: "Создана",
    render: (ticket: Ticket) => (
      <CustomText as="span" variant="p">
        {ticket.createdAt.date}{" "}
        <CustomText as="span" color="grey.200">
          {ticket.createdAt.time}
        </CustomText>
      </CustomText>
    ),
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
    header: "Тема",
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
    header: "Техник",
    render: (ticket: Ticket) =>
      ticket.assignee?.length > 2 ? (
        ticket.assignee
      ) : (
        <CustomText as="span" color="grey.100">
          &#8213;
        </CustomText>
      ),
  },
  {
    key: "reactionTime",
    header: "Реакция",
    render: (ticket: Ticket) => (
      <ReactionBadge
        status={ticket.reactionStatus ? ticket.reactionStatus : "ok"}
        label={ticket.reactionTime}
      />
    ),
  },
  {
    key: "solution",
    header: "Решение",
    render: (ticket: Ticket) =>
      ticket.solution?.length > 2 ? (
        <ReactionBadge
          status={ticket.solutionStatus ? ticket.solutionStatus : "ok"}
          label={ticket.solution}
        />
      ) : (
        <CustomText as="span" color="grey.100">
          &#8213;
        </CustomText>
      ),
  },
  {
    key: "status",
    header: "Статус",
    filterType: "select",
    options: STATUS_LABELS,
    render: (ticket: Ticket) => <StatusBadge status={ticket.status} />,
  },
];
