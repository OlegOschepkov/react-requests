import { Stack, VStack } from "@chakra-ui/react";
import SearchBlock from "@/components/features/tickets/SearchBlock.tsx";
import PageContainer from "@/components/layout/PageContainer.tsx";
import TicketsFilters from "@/components/features/tickets/TicketsFilters.tsx";
import TicketTable from "@/components/TicketTable/TicketTable.tsx";
import {
  CURRENT_USER,
  mockTickets,
} from "@/components/features/tickets/mockData.ts";
import { useState } from "react";
import type { TicketStatus } from "@/types/ticket.ts";
import TicketToolbar from "@/components/TicketToolbar/TicketToolbar.tsx";
import filterTickets from "@/utils/filterTickets.tsx";

const TicketsPage = () => {
  const [ticketFilter, setTicketFilter] = useState<TicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyMy, setOnlyMy] = useState(false);

  const filteredTickets = filterTickets(mockTickets, {
    status: ticketFilter,
    query: searchQuery,
    onlyMy,
    currentUser: CURRENT_USER,
  });

  return (
    <PageContainer>
      <Stack gap={6}>
        <TicketToolbar
          search={searchQuery}
          onSearchChange={setSearchQuery}
          onlyMy={onlyMy}
          onToggleMy={() => setOnlyMy((v) => !v)}
        />

        <VStack gap={6} align="stretch">
          <TicketsFilters value={ticketFilter} onChange={setTicketFilter} />

          <TicketTable tickets={filteredTickets} />
        </VStack>
      </Stack>
    </PageContainer>
  );
};

export default TicketsPage;
