import { Table, Box } from "@chakra-ui/react";

import type { Ticket } from "@/types/ticket.ts";
import StatusBadge from "@/components/TicketTable/StatusBadge.tsx";

interface Props {
  tickets: Ticket[];
}

const TicketTable = ({ tickets }: Props) => {
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
              <Table.ColumnHeader>Название</Table.ColumnHeader>
              <Table.ColumnHeader>Клиент</Table.ColumnHeader>
              <Table.ColumnHeader>Дата</Table.ColumnHeader>
              <Table.ColumnHeader>Статус</Table.ColumnHeader>
              <Table.ColumnHeader>Исполнитель</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tickets.map((ticket) => (
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
