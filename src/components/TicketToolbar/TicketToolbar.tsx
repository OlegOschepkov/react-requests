import { HStack, Input, Button, InputGroup } from "@chakra-ui/react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onlyMy: boolean;
  onToggleMy: () => void;
  onCreateClick: () => void;
}

const TicketToolbar = ({
  search,
  onSearchChange,
  onlyMy,
  onToggleMy,
  onCreateClick,
}: Props) => {
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

        <Button variant="outline" onClick={onToggleMy}>
          {onlyMy ? "Показаны мои" : "Показать только мои"}
        </Button>
      </HStack>
    </HStack>
  );
};

export default TicketToolbar;
