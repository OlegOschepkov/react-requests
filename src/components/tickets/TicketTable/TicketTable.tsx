import { Table, Box, HStack } from "@chakra-ui/react";
import type { Ticket } from "@/types/ticket.ts";
import { useEffect, useState } from "react";
import ColumnFilter from "@/components/tickets/ColumnFilter/ColumnFilter.tsx";
import { useDebounce } from "@/hooks/useDebounce.ts";
import TicketTableSkeleton from "@/components/tickets/TicketTable/TicketTableSkeleton.tsx";
import TicketTableEmptyState from "@/components/tickets/TicketTable/TicketTableEmptyState.tsx";
import { ticketColumns } from "@/components/tickets/TicketTable/TicketColumns.tsx";

interface TicketTableProps {
  tickets: Ticket[];
  hasFilters: boolean;
}

interface ColumnFilters {
  title: string;
  client: string;
  status: string;
}

const columnStyles = {
  id: { width: "90px" },
  loc: { width: "260px" },
  createdAt: { width: "165px" },
  priority: { width: "95px" },
  about: { width: "300px" },
  category: { width: "200px" },
  assignee: { width: "180px", minWidth: "180px" },
  reactionTime: { width: "120px", minWidth: "120px" },
  solution: { width: "120px", minWidth: "120px" },
  status: { width: "auto", minWidth: "150px" }, // TODO
};

const TicketTable = ({ tickets, hasFilters }: TicketTableProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({
    title: "",
    client: "",
    status: "",
  });

  const hasColumnFilters = Object.values(columnFilters).some(Boolean);

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
    <Box overflowX="auto" bg="white" borderRadius="8px" overflow="hidden">
      <Box overflowX="auto">
        <Table.Root>
          <Table.Header>
            <Table.Row
              bg="grey.50"
              borderBottom="1px solid"
              borderColor="grey.100"
            >
              {ticketColumns.map((column) => (
                <Table.ColumnHeader
                  key={column.key}
                  padding="8px 5px 8px 10px"
                  css={columnStyles[column.key as keyof typeof columnStyles]}
                >
                  <HStack
                    justify="space-between"
                    fontSize="14px"
                    lineHeight="24px"
                    color="grey.700"
                  >
                    {column.header}
                    <ColumnFilter
                      value={
                        columnFilters[column.key as keyof ColumnFilters] ?? ""
                      }
                      onChange={(value) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [column.key]: value,
                        }))
                      }
                      onReset={() =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [column.key]: "",
                        }))
                      }
                      {...(column.filterType === "select"
                        ? {
                            type: "select",
                            options: Object.entries(column.options).map(
                              ([value, label]) => ({
                                value,
                                label,
                              }),
                            ),
                          }
                        : {})}
                    />
                  </HStack>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(() => {
              if (filteredTickets.length === 0) {
                const emptyProps =
                  hasFilters || hasColumnFilters
                    ? {
                        message: "Ничего не найдено",
                        description: "Попробуйте изменить фильтры",
                      }
                    : { message: "Нет заявок" };

                return <TicketTableEmptyState {...emptyProps} />;
              }

              return filteredTickets.map((ticket) => (
                <Table.Row
                  key={ticket.id}
                  _hover={{ bg: "gray.50" }}
                  borderBottom="1px solid"
                  borderColor="grey.100"
                >
                  {ticketColumns.map((column) => (
                    <Table.Cell
                      key={column.key}
                      fontSize="14px"
                      lineHeight="24px"
                      color="grey.700"
                      padding="6px 10px"
                      textTransform={column.key === "id" ? "uppercase" : ""}
                    >
                      {column.render(ticket)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ));
            })()}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default TicketTable;
