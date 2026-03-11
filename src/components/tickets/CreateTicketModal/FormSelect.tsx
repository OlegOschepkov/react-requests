import { Select, createListCollection, Field } from "@chakra-ui/react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

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
  const collection = createListCollection({
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
            <Select.Trigger>
              <Select.ValueText placeholder={placeholder} />
            </Select.Trigger>

            <Select.Content>
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
