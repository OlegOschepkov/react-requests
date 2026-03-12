import { Table, VStack } from "@chakra-ui/react";
import CustomText from "@/components/ui/custom-text.tsx";

type TicketTableEmptyStateProps = {
  message: string;
  description?: string;
};

const TicketTableEmptyState = ({
  message,
  description,
}: TicketTableEmptyStateProps) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={10}>
        <VStack py={10} gap={1}>
          <CustomText fontWeight="medium">{message}</CustomText>
          {description && (
            <CustomText color="gray.500">{description}</CustomText>
          )}
        </VStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default TicketTableEmptyState;
