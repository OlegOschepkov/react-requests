import {
  Popover,
  Portal,
  Input,
  VStack,
  IconButton,
  NativeSelect,
} from "@chakra-ui/react";
import { LuFilter } from "react-icons/lu";
import ButtonCustom from "@/components/ui/button-custom.tsx";

interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
  type?: "text" | "select";
  options?: { value: string; label: string }[];
}

const ColumnFilter = ({
  value,
  onChange,
  onReset,
  type = "text",
  options = [],
}: ColumnFilterProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton
          aria-label="filter"
          size="xs"
          variant={value ? "solid" : "ghost"}
        >
          <LuFilter />
        </IconButton>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content p={3}>
            <VStack gap={2}>
              {type === "text" && (
                <Input
                  placeholder="Фильтр..."
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}

              {type === "select" && (
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                  >
                    <option value="">Все</option>

                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              )}

              <ButtonCustom size="sm" onClick={onReset}>
                Сбросить
              </ButtonCustom>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default ColumnFilter;
