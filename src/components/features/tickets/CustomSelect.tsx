import {
  Select,
  createListCollection,
  Portal,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: CustomSelectProps) => {
  const collection = createListCollection({
    items: options,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const selectedItem = options.find((opt) => opt.value === value);

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      onValueChange={({ value }) => onChange(value[0])}
      disabled={disabled}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder}>
            {selectedItem ? (
              <Flex align="center" gap={2}>
                {selectedItem.icon}
                <Text>{selectedItem.label}</Text>
              </Flex>
            ) : null}
          </Select.ValueText>
          <ChevronDown size={16} />
        </Select.Trigger>
        <Select.Indicator />
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {options.map((option) => (
              <Select.Item key={option.value} item={option}>
                <Flex align="center" gap={2} width="full">
                  <Box flex={1}>
                    <Text fontWeight="medium">{option.label}</Text>
                    dsdfg
                  </Box>
                </Flex>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
