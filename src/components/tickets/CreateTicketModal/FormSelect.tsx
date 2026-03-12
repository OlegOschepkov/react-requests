import { Select, createListCollection, Field, Icon } from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { LuChevronDown } from "react-icons/lu";

export type SelectOption = {
  value: string;
  label: React.ReactNode;
};

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
}

function FormSelect<T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  invalid,
}: FormSelectProps<T>) {
  const collection = createListCollection<SelectOption>({
    items: options,
  });

  return (
    <Field.Root invalid={invalid}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select.Root
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={(e) => field.onChange(e.value?.[0] ?? "")}
          >
            <Select.Trigger borderColor="grey.200">
              <Select.ValueText placeholder={placeholder}>
                {options.find((o) => o.value === field.value)?.label}
              </Select.ValueText>
              <Select.Indicator
                css={{
                  "&[data-state=open]": {
                    transform: "rotate(180deg)",
                  },
                }}
              >
                <Icon
                  as={LuChevronDown}
                  boxSize="28px"
                  transition="transform 0.2s"
                />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Content position="absolute" width="100%" top="100%">
              {options.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        )}
      />
    </Field.Root>
  );
}

export default FormSelect;
