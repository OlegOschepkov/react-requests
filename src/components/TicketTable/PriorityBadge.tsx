import { Box } from "@chakra-ui/react";
import type { TicketStatus } from "@/types/ticket.ts";
import { priorityStatuses } from "@/mockData/mockData.ts";

interface Props {
  status: TicketStatus;
}

const PriorityBadge = ({ status }: Props) => {
  const config = priorityStatuses[status];
  const { icon: Icon } = config;

  return (
    <Box display="inline-flex" alignItems="center" gap={1}>
      <Box as="span" color={config.color}>
        <Icon size={16} />
      </Box>
      {config.label}
    </Box>
  );
};

export default PriorityBadge;
