import { Table, Box, VStack } from "@chakra-ui/react";
import type { Ticket } from "@/types/ticket.ts";
import StatusBadge from "@/components/TicketTable/StatusBadge.tsx";
import { useEffect, useState } from "react";
import ColumnFilter from "@/components/ColumnFilter/ColumnFilter.tsx";
import { STATUS_LABELS } from "@/components/features/tickets/mockData.ts";
import { useDebounce } from "@/hooks/useDebounce.ts";
import TicketTableSkeleton from "@/components/TicketTable/TicketTableSkeleton.tsx";
import TicketTableEmptyState from "@/components/TicketTable/TicketTableEmptyState.tsx";

interface TicketTableProps {
  tickets: Ticket[];
  hasFilters: boolean;
}

interface ColumnFilters {
  title: string;
  client: string;
  status: string;
}

const TicketTable = ({ tickets, hasFilters }: TicketTableProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    title: "",
    client: "",
    status: "",
  });

  const debouncedFilters = useDebounce(columnFilters, 300);

  const filteredTickets = tickets.filter((ticket) => {
    return Object.entries(debouncedFilters).every(([key, value]) => {
      if (!value) return true;

      return String(ticket[key as keyof Ticket])
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => { // скорее всего излишне
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 300);
  //
  //   return () => clearTimeout(timer);
  // }, [debouncedFilters]);

  if (loading) {
    return <TicketTableSkeleton />;
  }

  return (
    <Box
      overflowX="auto"
      bg="white"
      borderRadius="lg"
      shadow="sm"
      overflow="hidden"
    >
      <Box overflowX="auto">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>
                Название
                <ColumnFilter
                  value={columnFilters.title}
                  onChange={(value) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      title: value,
                    }))
                  }
                  onReset={() =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      title: "",
                    }))
                  }
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                Клиент
                <ColumnFilter
                  value={columnFilters.client}
                  onChange={(value) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      client: value,
                    }))
                  }
                  onReset={() =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      client: "",
                    }))
                  }
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader>Дата</Table.ColumnHeader>
              <Table.ColumnHeader>
                Статус
                <ColumnFilter
                  type="select"
                  value={columnFilters.status}
                  options={Object.entries(STATUS_LABELS).map(
                    ([value, label]) => ({
                      value,
                      label,
                    }),
                  )}
                  onChange={(value) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      status: value,
                    }))
                  }
                  onReset={() =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      status: "",
                    }))
                  }
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader>Исполнитель</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets.length === 0 ? (
              hasFilters ? (
                <TicketTableEmptyState
                  message="Ничего не найдено"
                  description="Попробуйте изменить фильтры"
                />
              ) : (
                <TicketTableEmptyState message="Нет заявок" />
              )
            ) : (
              filteredTickets.map((ticket) => (
                <Table.Row key={ticket.id} _hover={{ bg: "gray.50" }}>
                  <Table.Cell>{ticket.id}</Table.Cell>
                  <Table.Cell>{ticket.title}</Table.Cell>
                  <Table.Cell>{ticket.client}</Table.Cell>
                  <Table.Cell>{ticket.createdAt}</Table.Cell>
                  <Table.Cell>
                    <StatusBadge status={ticket.status} />
                  </Table.Cell>
                  <Table.Cell>{ticket.assignee ?? "-"}</Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default TicketTable;
