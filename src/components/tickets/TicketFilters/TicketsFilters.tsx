import { Box, Flex } from "@chakra-ui/react";
import CustomButton from "@/components/ui/button-custom.tsx";
import type { TicketStatus } from "@/types/ticket.ts";
import { ticketStatuses } from "@/mockData/mockData.ts";
import { LuFilter } from "react-icons/lu";

interface TicketsFiltersProps {
  value: TicketStatus | "all";
  onChange: (status: TicketStatus | "all") => void;
}

const TicketsFilters = ({ value, onChange }: TicketsFiltersProps) => {
  return (
    <Flex gap="27px">
      <Flex gap="10px" align="center" wrap="wrap">
        {ticketStatuses.map((status) => {
          const isActive = value === status.value;

          return (
            <CustomButton
              key={status.value}
              variant={isActive ? "dark" : "base"}
              colorScheme={isActive ? "blackAlpha" : "gray"}
              onClick={() => onChange(status.value)}
            >
              {status.label}
            </CustomButton>
          );
        })}
      </Flex>

      <Box bg="grey.100" width="3px" alignSelf="stretch"></Box>

      <CustomButton gap="10px">
        <LuFilter />
        Показать только мои
      </CustomButton>
    </Flex>
  );
};

export default TicketsFilters;
