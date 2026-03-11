import { Flex } from "@chakra-ui/react";
import CustomButton from "@/components/ui/button.tsx";
import { User } from "lucide-react";
import type { TicketStatus } from "@/types/ticket.ts";
import { ticketStatuses } from "@/mockData/mockData.ts";

interface TicketsFiltersProps {
  value: TicketStatus | "all";
  onChange: (status: TicketStatus | "all") => void;
}

const TicketsFilters = ({ value, onChange }: TicketsFiltersProps) => {
  return (
    <Flex gap={2} wrap="wrap" align="center">
      {ticketStatuses.map((status) => {
        const isActive = value === status.value;

        return (
          <CustomButton
            key={status.value}
            size="sm"
            variant={isActive ? "solid" : "outline"}
            colorScheme={isActive ? "blackAlpha" : "gray"}
            onClick={() => onChange(status.value)}
          >
            {status.label}
          </CustomButton>
        );
      })}

      <CustomButton>
        <User size={16} />
        Показать только мои
      </CustomButton>
    </Flex>
  );
};

export default TicketsFilters;
