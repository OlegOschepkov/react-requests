import { Stack, VStack } from "@chakra-ui/react";
import PageContainer from "@/components/layout/PageContainer.tsx";
import TicketsFilters from "@/components/features/tickets/TicketsFilters.tsx";
import TicketTable from "@/components/TicketTable/TicketTable.tsx";
import {
  CURRENT_USER,
  mockTickets,
} from "@/components/features/tickets/mockData.ts";
import { useState } from "react";
import type { Ticket, TicketStatus } from "@/types/ticket.ts";
import TicketToolbar from "@/components/TicketToolbar/TicketToolbar.tsx";
import filterTickets from "@/utils/filterTickets.tsx";
import CreateTicketModal from "@/components/features/tickets/CreateTicketModal.tsx";

const TicketsPage = () => {
  const [ticketFilter, setTicketFilter] = useState<TicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyMy, setOnlyMy] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [tickets, setTickets] = useState(mockTickets);

  const filteredTickets = filterTickets(tickets, {
    status: ticketFilter,
    query: searchQuery,
    onlyMy,
    currentUser: CURRENT_USER,
  });

  const handleCreateTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  return (
    <PageContainer>
      <Stack gap={6}>
        <TicketToolbar
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onlyMy={onlyMy}
          onToggleMy={() => setOnlyMy((v) => !v)}
          onCreateClick={() => setCreateOpen(true)}
        />

        <VStack gap={6} align="stretch">
          <TicketsFilters value={ticketFilter} onChange={setTicketFilter} />

          <TicketTable
            tickets={filteredTickets}
            hasFilters={searchQuery !== "" || ticketFilter !== "all"}
          />
        </VStack>
      </Stack>

      <CreateTicketModal
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTicket}
      />
    </PageContainer>
  );
};

export default TicketsPage;
