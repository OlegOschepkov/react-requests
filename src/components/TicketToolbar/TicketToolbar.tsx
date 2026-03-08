import { HStack, Input, Button, InputGroup } from "@chakra-ui/react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onlyMy: boolean;
  onToggleMy: () => void;
}

const TicketToolbar = ({
  search,
  onSearchChange,
  onlyMy,
  onToggleMy,
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

      <Button variant="outline" onClick={onToggleMy}>
        {onlyMy ? "Показаны мои" : "Показать только мои"}
      </Button>
    </HStack>
  );
};

export default TicketToolbar;
