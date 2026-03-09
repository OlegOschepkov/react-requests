import { Badge } from "@chakra-ui/react";
import type { TicketStatus } from "@/types/ticket.ts";

interface Props {
  status: TicketStatus;
}

const statusMap = {
  new: { label: "Новая", color: "blue" },
  rejected: { label: "Отклонена", color: "red" },
  review: { label: "На рассмотрении", color: "orange" },
  in_progress: { label: "В работе", color: "purple" },
  waiting_parts: { label: "Ожидает запчасти", color: "yellow" },
  ready: { label: "Готово", color: "green" },
  closed: { label: "Закрыта", color: "gray" },
};

const StatusBadge = ({ status }: Props) => {
  const config = statusMap[status];
  return <Badge color={config.color}>{config.label}</Badge>;
};

export default StatusBadge;
