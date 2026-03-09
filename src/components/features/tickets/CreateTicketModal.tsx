import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  VStack,
  NativeSelect,
} from "@chakra-ui/react";
import { useState } from "react";
import FileUploadComponent from "@/components/FileUpload/FileUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateTicketForm,
  createTicketSchema,
} from "@/schemas/createTicketSchema.ts";
import type { Ticket, TicketStatus } from "@/types/ticket.ts";
import { CURRENT_USER } from "@/components/features/tickets/mockData.ts";

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ticket: Ticket) => void;
}

const CreateTicketModal = ({
  open,
  onClose,
  onCreate,
}: CreateTicketModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTicketForm>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      status: "new",
    },
  });

  const onSubmit = (data: CreateTicketForm) => {
    console.log("Создан тикет:", {
      ...data,
      files,
    });

    const newTicket: Ticket = {
      id: `T-${Date.now()}`,
      title: data.title,
      client: data.client,
      status: data.status as TicketStatus,
      assignee: CURRENT_USER,
      createdAt: new Date().toISOString(),
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
                <Field.Root invalid={!!errors.title}>
                  <Field.Label>Название</Field.Label>

                  <Input {...register("title")} />

                  <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.client}>
                  <Field.Label>Клиент</Field.Label>

                  <Input {...register("client")} />

                  <Field.ErrorText>{errors.client?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Статус</Field.Label>

                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder="Выберите статус"
                      {...register("status")}
                    >
                      <option value="new">Новая</option>
                      <option value="review">На рассмотрении</option>
                      <option value="in_progress">В работе</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>

                  <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <FileUploadComponent maxSizeMB={5} onChange={setFiles} />
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
