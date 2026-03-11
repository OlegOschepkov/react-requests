import { HStack, Input, Button, InputGroup } from "@chakra-ui/react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

const TicketToolbar = ({ search, onSearchChange, onCreateClick }: Props) => {
  return (
    <HStack justify="space-between" wrap="wrap" gap={4}>
      <InputGroup maxW="400px">
        <Input
          placeholder="Поиск заявок..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>

      <HStack>
        <Button variant="outline">Экспорт</Button>

        <Button colorScheme="blackAlpha" onClick={onCreateClick}>
          Новая заявка
        </Button>
      </HStack>
    </HStack>
  );
};

export default TicketToolbar;
