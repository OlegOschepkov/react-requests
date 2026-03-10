import { Table, Box } from "@chakra-ui/react";
import type { Ticket } from "@/types/ticket.ts";
import { useEffect, useState } from "react";
import ColumnFilter from "@/components/ColumnFilter/ColumnFilter.tsx";
import { useDebounce } from "@/hooks/useDebounce.ts";
import TicketTableSkeleton from "@/components/TicketTable/TicketTableSkeleton.tsx";
import TicketTableEmptyState from "@/components/TicketTable/TicketTableEmptyState.tsx";
import { ticketColumns } from "@/components/TicketTable/ticketColumns.tsx";

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
              {ticketColumns.map((column) => (
                <Table.ColumnHeader key={column.key}>
                  {column.header}
                  <ColumnFilter
                    value={
                      columnFilters[column.key as keyof ColumnFilters] ?? ""
                    }
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
                </Table.ColumnHeader>
              ))}
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
                  {ticketColumns.map((column) => (
                    <Table.Cell key={column.key}>
                      {column.render(ticket)}
                    </Table.Cell>
                  ))}
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
