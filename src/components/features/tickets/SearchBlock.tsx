import { Flex, Input } from "@chakra-ui/react";
import CustomButton from "@/components/ui/button.tsx";

export default function SearchBlock() {
  return (
    <Flex gap={3} direction={{ base: "column", md: "row" }}>
      <Input placeholder="Поиск" flex="1" />

      <CustomButton>Экспорт</CustomButton>

      <CustomButton>Новая заявка</CustomButton>
    </Flex>
  );
}
