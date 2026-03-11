import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  VStack,
  Text,
  NativeSelect,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUploadComponent from "@/components/FileUpload/FileUpload";

import {
  type CreateTicketForm,
  createTicketSchema,
} from "@/schemas/createTicketSchema";

import type { FormTicket } from "@/types/ticket";

import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formLocValues,
} from "@/mockData/mockData";
import { mapRecordToOptions } from "@/hooks/mapRecordToOptions.ts";
import { formatCreatedAt } from "@/utils/dateFormat.ts";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ticket: FormTicket) => void;
}

const CreateTicketModal = ({
  open,
  onClose,
  onCreate,
}: CreateTicketModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      status: "new",
      files: [],
    },
  });

  const categoryOptions = mapRecordToOptions(CATEGORY_LABELS);
  const priorityOptions = mapRecordToOptions(PRIORITY_LABELS);

  const onSubmit = (data: CreateTicketForm) => {
    console.log("Создан тикет:", {
      ...data,
    });

    const selectedLoc = formLocValues.find((loc) => loc.id === data.locId);

    if (!selectedLoc) {
      console.error("Локация не найдена");
      return;
    }

    const newTicket: FormTicket = {
      id: `T-${Date.now()}`,
      loc: selectedLoc,
      about: data.about,
      category: data.category,
      priority: data.priority,
      description: data.description,
      status: "new",
      createdAt: formatCreatedAt(),
    };

    onCreate(newTicket);

    reset();
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Новая заявка</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4}>
                {/* Аптека */}
                <Field.Root invalid={!!errors.locId}>
                  <Field.Label>Аптека</Field.Label>

                  <NativeSelect.Root>
                    <NativeSelect.Field {...register("locId")} defaultValue="">
                      <option value="" disabled hidden>
                        Выберите аптеку
                      </option>
                      {formLocValues.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.id}, {loc.name}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>

                  <Field.ErrorText>{errors.locId?.message}</Field.ErrorText>
                </Field.Root>

                {/* Тема */}
                <Field.Root invalid={!!errors.about}>
                  <Field.Label>Тема</Field.Label>

                  <Input {...register("about")} />

                  <Field.ErrorText>{errors.about?.message}</Field.ErrorText>
                </Field.Root>

                {/* Категория */}
                <Field.Root invalid={!!errors.category}>
                  <Field.Label>Категория заявки</Field.Label>

                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("category")}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Холодильники, кондиционеры или другое
                      </option>
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>

                  <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
                </Field.Root>

                {/* Приоритет */}
                <Field.Root invalid={!!errors.status}>
                  <Field.Label>Приоритет</Field.Label>

                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("priority")}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Средний: влияет на эффективность, но не стопорит
                      </option>
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>

                  <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
                </Field.Root>

                {/* Описание */}
                <Field.Root invalid={!!errors.description}>
                  <Field.Label>Описание</Field.Label>

                  <Input {...register("description")} />

                  <Field.ErrorText>
                    {errors.description?.message}
                  </Field.ErrorText>
                </Field.Root>

                {/* Файлы */}
                <Field.Root>
                  <FileUploadComponent
                    onChange={(files) =>
                      setValue("files", files, { shouldValidate: true })
                    }
                  />

                  {errors.files && (
                    <Text color="red.500">{errors.files.message}</Text>
                  )}
                </Field.Root>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>

              <Button colorScheme="blackAlpha" onClick={handleSubmit(onSubmit)}>
                Создать
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateTicketModal;
