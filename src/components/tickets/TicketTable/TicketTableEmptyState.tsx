import { Table, Text, VStack } from "@chakra-ui/react";

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
      <Table.Cell colSpan={5}>
        <VStack py={10} gap={1}>
          <Text fontWeight="medium">{message}</Text>
          {description && (
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>
          )}
        </VStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default TicketTableEmptyState;
