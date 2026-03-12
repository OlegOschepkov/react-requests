import { Table, Skeleton, Box, IconButton } from "@chakra-ui/react";
import { ROWS } from "@/mockData/mockData.ts";
import { ticketColumns } from "@/components/tickets/TicketTable/TicketColumns.tsx";
import { LuFilter } from "react-icons/lu";

const TicketTableSkeleton = () => {
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
              {ticketColumns.map((column) => (
                <Table.ColumnHeader key={column.key}>
                  {column.header}
                  <IconButton aria-label="filter" size="xs" variant="ghost">
                    <LuFilter />
                  </IconButton>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: ROWS }).map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {ticketColumns.map((column) => (
                  <Table.Cell key={`skeleton-${rowIndex}-${column.key}`}>
                    <Skeleton height="20px" />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default TicketTableSkeleton;
