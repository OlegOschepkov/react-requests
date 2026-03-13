import { Field } from "@chakra-ui/react";
import {
  type Control,
  Controller,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";
import type { CreateTicketForm } from "@/schemas/createTicketSchema";
import FileUploadComponent from "@/components/tickets/FileUpload/FileUpload.tsx";

type FileUploadFieldProps = {
  control: Control<CreateTicketForm>;
  setValue: UseFormSetValue<CreateTicketForm>;
  setError: UseFormSetError<CreateTicketForm>;
};

const FileUploadField = ({
  control,
  setValue,
  setError,
}: FileUploadFieldProps) => (
  <Controller
    name="files"
    control={control}
    render={({ fieldState }) => (
      <Field.Root invalid={!!fieldState.error}>
        <Field.Label fontSize="12px">Прикрепите файлы</Field.Label>

        <FileUploadComponent
          onChange={(files) =>
            setValue("files", files, { shouldValidate: true })
          }
          onError={(message) => setError("files", { message })}
        />

        <Field.ErrorText color="red">
          {fieldState.error?.message}
        </Field.ErrorText>
      </Field.Root>
    )}
  />
);

export default FileUploadField;
