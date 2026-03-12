import { Box, HStack } from "@chakra-ui/react";
import type { ReactionStatus } from "@/types/ticket.ts";
import { reactionStatuses } from "@/mockData/mockData.ts";

interface Props {
  status: ReactionStatus;
  label: string;
}

const ReactionBadge = ({ status, label }: Props) => {
  const config = reactionStatuses[status];
  const { icon: Icon, color } = config;

  return (
    <HStack
      display="inline-flex"
      alignItems="center"
      gap={1}
      color={color}
      fontSize="14px"
      lineHeight="24px"
      align="center"
    >
      <Box as="span" color="inherit">
        <Icon size={16} />
      </Box>
      {label}
    </HStack>
  );
};

export default ReactionBadge;
