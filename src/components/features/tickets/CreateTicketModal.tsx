import {
  Dialog,
  Portal,
  Button,
  Input,
  Textarea,
  Select,
  Stack,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateTicketModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    console.log("ticket created");
    setOpen(false);
  };

  return (
    <>
      <Button bg="black" color="white" onClick={() => setOpen(true)}>
        Новая заявка
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Новая заявка</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>Тип заявки</Field.Label>

                    <Select>
                      <option>Ремонт</option>
                      <option>Обслуживание</option>
                      <option>Другое</option>
                    </Select>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Приоритет</Field.Label>

                    <Select>
                      <option>Низкий</option>
                      <option>Средний</option>
                      <option>Высокий</option>
                    </Select>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Описание</Field.Label>

                    <Textarea placeholder="Опишите проблему..." />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Фотографии</Field.Label>

                    <Input type="file" multiple />
                  </Field.Root>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer gap={3}>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Отмена
                </Button>

                <Button bg="black" color="white" onClick={handleSubmit}>
                  Создать
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default CreateTicketModal;
