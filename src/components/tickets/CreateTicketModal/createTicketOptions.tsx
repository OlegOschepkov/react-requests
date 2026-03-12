import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formLocValues,
} from "@/mockData/mockData";
import { mapRecordToOptions } from "@/hooks/mapRecordToOptions";
import PriorityBadge from "@/components/tickets/TicketTable/PriorityBadge";
import { Box } from "@chakra-ui/react";
import CustomText from "@/components/ui/custom-text";
import type { PriorityStatus } from "@/types/ticket";

export const categoryOptions = mapRecordToOptions(CATEGORY_LABELS);

export const priorityOptions = mapRecordToOptions(PRIORITY_LABELS).map(
  (label) => ({
    value: label.value,
    label: (
      <PriorityBadge status={label.value as PriorityStatus} variant="select" />
    ),
  }),
);

export const locOptions = formLocValues.map((loc) => ({
  value: loc.id,
  label: (
    <Box>
      <CustomText
        as="span"
        bg="grey.50"
        borderRadius="4px"
        fontWeight="600"
        letterSpacing="8%"
        padding="1px 3px"
        marginRight="9px"
      >
        {loc.id}
      </CustomText>
      {loc.name}
    </Box>
  ),
}));
