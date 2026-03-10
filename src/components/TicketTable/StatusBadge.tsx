import { Badge } from "@chakra-ui/react";
import type { TicketStatus } from "@/types/ticket.ts";
import { statusMap } from "@/mockData/mockData.ts";

interface Props {
  status: TicketStatus;
}

const StatusBadge = ({ status }: Props) => {
  const config = statusMap[status];

  return <Badge color={config.color}>{config.label}</Badge>;
};

export default StatusBadge;
