import { Box, HStack, Stack, Tabs, Badge } from "@chakra-ui/react";
import PageContainer from "@/components/layout/PageContainer.tsx";
import TicketTable from "@/components/tickets/TicketTable/TicketTable.tsx";
import { CURRENT_USER, mockTickets } from "@/mockData/mockData.ts";
import { useState, useMemo, useCallback } from "react";
import type { FormTicket, Ticket, TicketStatus } from "@/types/ticket.ts";
import TicketToolbar from "@/components/tickets/TicketToolbar/TicketToolbar.tsx";
import CreateTicketModal from "@/components/tickets/CreateTicketModal/CreateTicketModal.tsx";
import filterTickets from "@/utils/filterTickets.tsx";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import type { IconType } from "react-icons";
import { LuFilter } from "react-icons/lu";

type TicketTab = TicketStatus | "all" | "mine";

type TicketTabItem = {
  value: TicketTab;
  label: string;
  icon?: IconType;
  dividerBefore?: boolean;
  showCount?: boolean; // 👈 флаг для показа количества
};

const ticketTabs: TicketTabItem[] = [
  { value: "new", label: "Новые", showCount: true },
  { value: "rejected", label: "Отклонены", showCount: true },
  { value: "review", label: "На рассмотрении", showCount: true },
  { value: "in_progress", label: "В работе", showCount: true },
  { value: "waiting_parts", label: "Ожидают запчасти", showCount: true },
  { value: "ready", label: "Готовы", showCount: true },
  { value: "closed", label: "Закрыты", showCount: true },
  { value: "all", label: "Все статусы" },
  {
    value: "mine",
    label: "Показать только мои",
    icon: LuFilter,
    dividerBefore: true,
    showCount: true, // 👈 для "Мои" тоже показываем количество
  },
];

const getTabTickets = (tab: TicketTab, tickets: Ticket[]) => {
  if (tab === "all") return tickets;
  if (tab === "mine") return tickets.filter((t) => t.assignee === CURRENT_USER);

  return tickets.filter((t) => t.status === tab);
};

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const filteredTickets = useMemo(
    () =>
      filterTickets(tickets, {
        status: "all",
        query: searchQuery,
        currentUser: CURRENT_USER,
      }),
    [tickets, searchQuery],
  );

  // 👇 Мемоизируем количество для каждого таба
  const tabCounts = useMemo(() => {
    const counts: Record<TicketTab, number> = {
      all: filteredTickets.length,
      mine: filteredTickets.filter((t) => t.assignee === CURRENT_USER).length,
      new: filteredTickets.filter((t) => t.status === "new").length,
      rejected: filteredTickets.filter((t) => t.status === "rejected").length,
      review: filteredTickets.filter((t) => t.status === "review").length,
      in_progress: filteredTickets.filter((t) => t.status === "in_progress")
        .length,
      waiting_parts: filteredTickets.filter((t) => t.status === "waiting_parts")
        .length,
      ready: filteredTickets.filter((t) => t.status === "ready").length,
      closed: filteredTickets.filter((t) => t.status === "closed").length,
    };
    return counts;
  }, [filteredTickets]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCreateClick = useCallback(() => {
    setCreateOpen(true);
  }, []);

  const handleCreateTicket = useCallback((formTicket: FormTicket) => {
    const newTicket: Ticket = {
      ...formTicket,
      assignee: CURRENT_USER,
      reactionTime: "",
      solution: "",
      status: "new",
    };
    setTickets((prev) => [newTicket, ...prev]);
  }, []);

  return (
    <PageContainer>
      <Stack gap="0" py={{ md: "16px", lg: "20px" }}>
        <TicketToolbar
          search={searchQuery}
          onSearchChange={handleSearchChange}
          onCreateClick={handleCreateClick}
        />

        <Tabs.Root defaultValue="all" lazyMount unmountOnExit>
          <Tabs.List
            gap="8px"
            borderBottom="none"
            flexWrap="wrap"
            py={{ md: "16px", lg: "22px" }}
          >
            {ticketTabs.map((tab) => {
              const Icon = tab.icon;
              const count = tabCounts[tab.value];

              return (
                <HStack key={tab.value}>
                  {tab.dividerBefore && (
                    <Box
                      bg="grey.100"
                      width="3px"
                      alignSelf="stretch"
                      margin="0px 14px"
                    />
                  )}

                  <Tabs.Trigger value={tab.value} asChild>
                    <ButtonCustom gap="10px" fontSize="16px" variant="noBorder">
                      {Icon && <Icon />}
                      {tab.label}
                      {tab.showCount && count > 0 && (
                        <Badge
                          bg="grey.100"
                          color="grey.700"
                          borderRadius="full"
                          px={2}
                          py={0.5}
                          fontSize="12px"
                          fontWeight="normal"
                          ml={1}
                        >
                          {count}
                        </Badge>
                      )}
                    </ButtonCustom>
                  </Tabs.Trigger>
                </HStack>
              );
            })}
          </Tabs.List>

          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            width="100vw"
            height="1px"
            bg="grey.100"
          />

          {ticketTabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value} py="31px">
              <TicketTable
                tickets={getTabTickets(tab.value, filteredTickets)}
                hasFilters={!!searchQuery}
              />
            </Tabs.Content>
          ))}
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
