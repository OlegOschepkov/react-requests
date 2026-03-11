import {
  Dialog,
  Portal,
  Input,
  Field,
  VStack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FileUploadComponent from "@/components/tickets/FileUpload/FileUpload.tsx";

import {
  type CreateTicketForm,
  createTicketSchema,
} from "@/schemas/createTicketSchema.ts";

import type { FormTicket } from "@/types/ticket.ts";

import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formLocValues,
} from "@/mockData/mockData.ts";
import { mapRecordToOptions } from "@/hooks/mapRecordToOptions.ts";
import { formatCreatedAt } from "@/utils/dateFormat.ts";
import FormSelect from "@/components/tickets/CreateTicketModal/FormSelect.tsx";
import ButtonCustom from "@/components/ui/button-custom.tsx";

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
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      status: "new",
      files: [],
      locId: "",
      category: "",
      priority: "medium",
      warranty: false,
    },
  });

  const categoryOptions = mapRecordToOptions(CATEGORY_LABELS);
  const priorityOptions = mapRecordToOptions(PRIORITY_LABELS);
  const locOptions = formLocValues.map((loc) => ({
    value: loc.id,
    label: `${loc.id} — ${loc.name}`,
  }));

  const onSubmit = (data: CreateTicketForm) => {
    try {
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
        warranty: data.warranty,
        createdAt: formatCreatedAt(),
      };

      onCreate(newTicket);

      reset();
      onClose();
    } catch (error) {
      console.error("Ошибка при создании заявки:", error);
    }
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
              <VStack gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Аптека */}
                <Field.Root invalid={!!errors.locId}>
                  <Field.Label>Аптека</Field.Label>

                  <FormSelect<CreateTicketForm>
                    name="locId"
                    control={control}
                    options={locOptions}
                    placeholder="Выберите аптеку"
                  />

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

                  <FormSelect<CreateTicketForm>
                    name="category"
                    control={control}
                    options={categoryOptions}
                    placeholder="Выберите категорию"
                  />

                  <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
                </Field.Root>

                {/* Приоритет */}
                <Field.Root invalid={!!errors.status}>
                  <Field.Label>Приоритет</Field.Label>

                  <FormSelect<CreateTicketForm>
                    name="priority"
                    control={control}
                    options={priorityOptions}
                    placeholder="Выберите приоритет"
                  />

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

                {/* Гарантия */}
                <Field.Root>
                  <Checkbox.Root
                    checked={watch("warranty")}
                    onCheckedChange={(e) => setValue("warranty", !!e.checked)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Гарантийный случай</Checkbox.Label>
                  </Checkbox.Root>
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
              <ButtonCustom variant="outline" onClick={onClose}>
                Отмена
              </ButtonCustom>

              <ButtonCustom
                colorScheme="blackAlpha"
                onClick={handleSubmit(onSubmit)}
              >
                Создать
              </ButtonCustom>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateTicketModal;
