import { Field } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

type Props = {
  label: string;
  error?: FieldError;
  children: ReactNode;
};

const FormField = ({ label, error, children }: Props) => {
  return (
    <Field.Root invalid={!!error} gap="6px">
      <Field.Label fontSize="12px">{label}</Field.Label>

      {children}

      <Field.ErrorText color="red">{error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default FormField;
