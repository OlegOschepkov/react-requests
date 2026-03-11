import { Stack, VStack, Tabs } from "@chakra-ui/react";
import PageContainer from "@/components/layout/PageContainer.tsx";
import TicketTable from "@/components/tickets/TicketTable/TicketTable.tsx";
import { CURRENT_USER, mockTickets } from "@/mockData/mockData.ts";
import { useState } from "react";
import type { FormTicket, Ticket, TicketStatus } from "@/types/ticket.ts";
import TicketToolbar from "@/components/tickets/TicketToolbar/TicketToolbar.tsx";
import CreateTicketModal from "@/components/tickets/CreateTicketModal/CreateTicketModal.tsx";
import filterTickets from "@/utils/filterTickets.tsx";

type TicketTab = TicketStatus | "all" | "mine";

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [tab, setTab] = useState<TicketTab>("all");

  const ticketFilter: TicketStatus | "all" = tab === "mine" ? "all" : tab;

  const filteredTickets = filterTickets(tickets, {
    status: ticketFilter,
    query: searchQuery,
    currentUser: CURRENT_USER,
  });

  const allTickets = filteredTickets;
  const newTickets = filteredTickets.filter((t) => t.status === "new");
  const reviewTickets = filteredTickets.filter((t) => t.status === "review");
  const inProgressTickets = filteredTickets.filter(
    (t) => t.status === "in_progress",
  );
  const waitingPartsTickets = filteredTickets.filter(
    (t) => t.status === "waiting_parts",
  );
  const readyTickets = filteredTickets.filter((t) => t.status === "ready");
  const closedTickets = filteredTickets.filter((t) => t.status === "closed");
  const mineTickets = filteredTickets.filter(
    (t) => t.assignee === CURRENT_USER,
  );

  const handleCreateTicket = (formTicket: FormTicket) => {
    const newTicket: Ticket = {
      ...formTicket,
      assignee: CURRENT_USER,
      reactionTime: "",
      solution: "",
      status: "new",
    };

    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <PageContainer>
      <Stack gap={6}>
        <TicketToolbar
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateClick={() => setCreateOpen(true)}
        />

        <Tabs.Root defaultValue="all">
          <Tabs.List>
            <Tabs.Trigger value="all">Все</Tabs.Trigger>
            <Tabs.Trigger value="new">Новые</Tabs.Trigger>
            <Tabs.Trigger value="inProgress">В работе</Tabs.Trigger>
            <Tabs.Trigger value="done">Закрытые</Tabs.Trigger>
            <Tabs.Trigger value="mine">Мои</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="all">
            <TicketTable tickets={allTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>

          <Tabs.Content value="new">
            <TicketTable tickets={newTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>

          <Tabs.Content value="review">
            <TicketTable tickets={reviewTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>

          <Tabs.Content value="in_progress">
            <TicketTable
              tickets={inProgressTickets}
              hasFilters={!!searchQuery}
            />
          </Tabs.Content>

          <Tabs.Content value="waiting_parts">
            <TicketTable
              tickets={waitingPartsTickets}
              hasFilters={!!searchQuery}
            />
          </Tabs.Content>

          <Tabs.Content value="ready">
            <TicketTable tickets={readyTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>

          <Tabs.Content value="closed">
            <TicketTable tickets={closedTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>

          <Tabs.Content value="mine">
            <TicketTable tickets={mineTickets} hasFilters={!!searchQuery} />
          </Tabs.Content>
        </Tabs.Root>
      </Stack>

      <CreateTicketModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTicket}
      />
    </PageContainer>
  );
};

export default TicketsPage;
