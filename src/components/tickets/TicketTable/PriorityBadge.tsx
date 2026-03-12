import { Box, HStack } from "@chakra-ui/react";
import type { PriorityStatus } from "@/types/ticket.ts";
import { priorityStatuses } from "@/mockData/mockData.ts";
import CustomText from "@/components/ui/custom-text.tsx";

interface Props {
  status: PriorityStatus;
  variant?: "select";
}

const PriorityBadge = ({ status, variant }: Props) => {
  const config = priorityStatuses[status];
  const { icon: Icon, color, label, select } = config;

  return (
    <HStack
      display="inline-flex"
      alignItems="center"
      gap="10px"
      fontSize="12px"
      lineHeight="24px"
      align="center"
      color={variant ? "grey.700" : "grey.200"}
    >
      <Box as="span" color={color}>
        <Icon size={16} />
      </Box>
      {label}
      {variant && (
        <CustomText as="span" color="grey.200">
          {select}
        </CustomText>
      )}
    </HStack>
  );
};

export default PriorityBadge;
