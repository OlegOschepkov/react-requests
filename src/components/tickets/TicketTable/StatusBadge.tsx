import { Badge } from "@chakra-ui/react";
import type { TicketStatus } from "@/types/ticket.ts";
import { statusMap } from "@/mockData/mockData.ts";

interface Props {
  status: TicketStatus;
}

const StatusBadge = ({ status }: Props) => {
  const config = statusMap[status];

  return (
    <Badge
      bg={config.color}
      fontSize="14px"
      lineHeight="24px"
      padding="1px 6px"
      borderRadius="4px"
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
