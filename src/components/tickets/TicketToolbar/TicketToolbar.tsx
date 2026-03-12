import { CloseButton, HStack, Icon, Input, InputGroup } from "@chakra-ui/react";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import { LuFileText, LuPlus, LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce.ts";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

const TicketToolbar = ({ search, onSearchChange, onCreateClick }: Props) => {
  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const endElement = localSearch ? (
    <CloseButton size="xs" onClick={handleClear} me="-2" />
  ) : undefined;

  return (
    <HStack justify="space-between" gap="12px">
      <InputGroup
        startElement={<Icon as={LuSearch} boxSize="20px" />}
        endElement={endElement}
      >
        <Input
          fontSize="16px"
          lineHeight="24px"
          placeholder="Поиск по номеру или теме заявки"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </InputGroup>

      <HStack>
        <ButtonCustom variant="base" gap="12px" padding="8px 12px">
          <LuFileText />
          Экспорт
        </ButtonCustom>

        <ButtonCustom
          variant="dark"
          gap="9px"
          onClick={onCreateClick}
          padding="8px 12px"
          whiteSpace="nowrap"
        >
          <Icon as={LuPlus} boxSize="20px" />
          Создать новую заявку
        </ButtonCustom>
      </HStack>
    </HStack>
  );
};

export default TicketToolbar;
