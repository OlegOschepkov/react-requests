import {
  Table,
  Skeleton,
  Box,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ROWS } from "@/mockData/mockData.ts";
import { ticketColumns } from "@/components/tickets/TicketTable/TicketColumns.tsx";
import { LuFilter } from "react-icons/lu";

interface TicketTableSkeletonProps {
  isMobile?: boolean;
}
const TicketTableSkeleton = ({
  isMobile = false,
}: TicketTableSkeletonProps) => {
  if (isMobile) {
    return (
      <>
        {Array.from({ length: ROWS }).map((_, i) => (
          <Box key={i} display="flex" flexWrap="wrap" gap="12px">
            <VStack
              flex="300px"
              bg="white"
              borderRadius="8px"
              border="1px solid"
              borderColor="grey.100"
              p="12px"
              gap="13px"
            >
              {/* ROW 1 */}
              <HStack justify="space-between" align="center" w="100%">
                <Skeleton height="20px" width="60%" />

                <HStack gap="8px">
                  <Skeleton height="20px" width="24px" />
                  <Skeleton height="20px" width="17%" />
                </HStack>
              </HStack>

              {/* ROW 2 */}
              <HStack justify="space-between" w="100%">
                <Skeleton height="20px" width="20%" />

                <Skeleton height="20px" width="55%" />

                <Skeleton height="20px" width="20%" />
              </HStack>
            </VStack>
          </Box>
        ))}
      </>
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
