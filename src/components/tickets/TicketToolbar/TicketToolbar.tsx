import {
  Box,
  CloseButton,
  HStack,
  Icon,
  Input,
  InputGroup,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import { LuPlus, LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce.ts";
import PdfIcon from "@/components/ui/icon-pdf.tsx";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

const TicketToolbar = ({ search, onSearchChange, onCreateClick }: Props) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [expanded, setExpanded] = useState(false);
  const debouncedSearch = useDebounce(localSearch, 300);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
    setExpanded(false);
  };

  const endElement = localSearch ? (
    <CloseButton size="xs" onClick={handleClear} me="-2" />
  ) : undefined;

  return (
    <Stack
      justify="space-between"
      gap="12px"
      direction={{ base: "column", md: "row" }}
    >
      {expanded && (
        <Box
          position="fixed"
          inset="0"
          bg="blackAlpha.300"
          zIndex="25"
          display={{ base: "block", md: "none" }}
          onClick={() => setExpanded(false)}
        />
      )}
      <InputGroup
        position={{ base: "fixed", md: "static" }}
        bottom={{ base: "82px", md: "auto" }}
        right={{ base: "16px", md: "auto" }}
        zIndex="30"
        bg={{ base: "white", md: "transparent" }}
        borderRadius="8px"
        border={{ base: "1px solid", md: "none" }}
        borderColor="grey.700"
        width={{
          base: expanded ? "calc(100vw - 32px)" : "104px",
          md: "100%",
        }}
        transition="width 0.2s"
        startElement={<Icon as={LuSearch} boxSize="20px" />}
        endElement={endElement}
      >
        <Input
          fontSize="16px"
          lineHeight="24px"
          placeholder={expanded ? "Поиск по номеру или теме заявки" : "Поиск"}
          value={localSearch}
          onFocus={() => setExpanded(true)}
          onChange={(e) => setLocalSearch(e.target.value)}
          cursor={{ base: expanded ? "text" : "pointer", md: "text" }}
          _placeholder={{
            base: {
              color: "grey.700",
              fontSize: "16px !important",
            },
            md: {
              color: "grey.250",
            },
          }}
        />
      </InputGroup>

      <HStack>
        <ButtonCustom
          gap="12px"
          padding="8px 12px"
          display={{ base: "none", md: "flex" }}
        >
          <PdfIcon boxSize="15px" />
          Экспорт
        </ButtonCustom>

        <ButtonCustom
          variant="dark"
          gap={{ base: "4px", md: "9px" }}
          onClick={onCreateClick}
          padding="8px 12px"
          whiteSpace="nowrap"
          position={{ base: "fixed", md: "static" }}
          bottom={{ base: "30px", md: "auto" }}
          right={{ base: "16px", md: "auto" }}
          zIndex="20"
          boxShadow={{ base: "lg", md: "none" }}
        >
          <Icon as={LuPlus} boxSize="20px" />
          Создать новую заявку
        </ButtonCustom>
      </HStack>
    </Stack>
  );
};

export default TicketToolbar;
