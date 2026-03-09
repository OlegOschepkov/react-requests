import { Table, Box } from "@chakra-ui/react";

import type { Ticket } from "@/types/ticket.ts";
import StatusBadge from "@/components/TicketTable/StatusBadge.tsx";
import { useState } from "react";
import ColumnFilter from "@/components/ColumnFilter/ColumnFilter.tsx";
import { STATUS_LABELS } from "@/components/features/tickets/mockData.ts";
import { useDebounce } from "@/hooks/useDebounce.ts";

interface Props {
  tickets: Ticket[];
}

const TicketTable = ({ tickets }: Props) => {
  const [columnFilters, setColumnFilters] = useState({
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

  if (!tickets.length) {
    // TODO
    return (
      <Box p={10} textAlign="center" bg="white" borderRadius="lg" shadow="sm">
        Нет заявок
      </Box>
    );
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
            {filteredTickets.map((ticket) => (
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
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default TicketTable;
