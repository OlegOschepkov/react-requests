import { HStack, Input, InputGroup } from "@chakra-ui/react";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import { LuFileText, LuPlus } from "react-icons/lu";

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
        <ButtonCustom variant="base" gap="12px">
          <LuFileText />
          Экспорт
        </ButtonCustom>

        <ButtonCustom variant="dark" gap="12px" onClick={onCreateClick}>
          <LuPlus />
          Создать новую заявку
        </ButtonCustom>
      </HStack>
    </HStack>
  );
};

export default TicketToolbar;
