import { Table, Skeleton } from "@chakra-ui/react";
import { ROWS } from "@/components/features/tickets/mockData.ts";

const TicketTableSkeleton = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Название</Table.ColumnHeader>
          <Table.ColumnHeader>Клиент</Table.ColumnHeader>
          <Table.ColumnHeader>Статус</Table.ColumnHeader>
          <Table.ColumnHeader>Исполнитель</Table.ColumnHeader>
          <Table.ColumnHeader>Дата</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Array.from({ length: ROWS }).map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <Skeleton height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" width="80px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" width="120px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" width="100px" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TicketTableSkeleton;
