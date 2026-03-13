import {
  Dialog,
  Portal,
  Field,
  VStack,
  Checkbox,
  HStack,
  Box,
  Textarea,
  IconButton,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { type Control, useForm, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  categoryOptions,
  priorityOptions,
  locOptions,
} from "./createTicketOptions";

import {
  type CreateTicketForm,
  createTicketSchema,
} from "@/schemas/createTicketSchema.ts";

import type { FormTicket } from "@/types/ticket.ts";

import FormSelect from "@/components/tickets/CreateTicketModal/FormSelect.tsx";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import { LuArrowLeft, LuX } from "react-icons/lu";
import { createTicketFromForm } from "@/components/tickets/CreateTicketModal/useCreateTicketSubmit.tsx";
import DescriptionPlaceholder from "@/components/tickets/CreateTicketModal/DescriptionPlaceholder.tsx";
import FileUploadField from "@/components/tickets/CreateTicketModal/FileUploadField.tsx";
import FormField from "@/components/tickets/CreateTicketModal/FormField.tsx";

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
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      status: "new",
      files: [],
      locId: "",
      category: null,
      priority: "medium",
      warranty: false,
    },
  });

  const onSubmit = (data: CreateTicketForm) => {
    try {
      const ticket = createTicketFromForm(data);

      onCreate(ticket);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const aboutValue = watch("description");
  const showAboutPlaceholder = !aboutValue && !isFocused;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      size={"lg"}
      closeOnInteractOutside={false}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content maxW="1007px" w="full" borderRadius="15px">
            <Dialog.Header
              padding={{ base: "27px 47px", md: "33px 37px" }}
              borderBottom={{ base: "1px solid", md: "none" }}
              borderColor="grey.150"
            >
              <Dialog.CloseTrigger asChild>
                <Box
                  position="absolute"
                  top={{ base: "16px", md: "25px" }}
                  right={{ base: "calc(100% - 47px)", md: "33px" }}
                >
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    onClick={onClose}
                  >
                    <Icon
                      as={LuX}
                      boxSize="32px"
                      display={{ base: "none", md: "inline-block" }}
                    />
                    <Icon
                      as={LuArrowLeft}
                      boxSize="24px"
                      display={{ base: "inline-block", md: "none" }}
                    />
                  </IconButton>
                </Box>
              </Dialog.CloseTrigger>
              <Dialog.Title
                fontWeight="500"
                fontSize={{ base: "20px", md: "24px" }}
                lineHeight="100%"
              >
                Создание заявки
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body
              width="100%"
              padding={{ base: "24px 16px", md: "3px 37px" }}
            >
              <HStack
                wrap="wrap"
                gap="36px"
                as="form"
                align="top"
                onSubmit={handleSubmit(onSubmit)}
              >
                <VStack flex="300px" gap={{ base: "24px", md: "50px" }}>
                  {/* Аптека */}
                  <FormField label="Аптека" error={errors.locId}>
                    <FormSelect
                      name="locId"
                      control={control}
                      options={locOptions}
                      placeholder="Выберите аптеку от которой исходит заявка"
                    />
                  </FormField>

                  <VStack width="100%" gap="16px">
                    {/* Категория */}
                    <FormField label="Категория заявки" error={errors.category}>
                      <FormSelect
                        name="category"
                        control={control}
                        options={categoryOptions}
                        placeholder="Холодильники, кондиционеры или другое"
                      />
                    </FormField>

                    {/* Гарантия */}
                    <Field.Root>
                      <Checkbox.Root
                        checked={watch("warranty")}
                        onCheckedChange={(e) =>
                          setValue("warranty", !!e.checked)
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>Гарантийный случай?</Checkbox.Label>
                      </Checkbox.Root>
                    </Field.Root>
                  </VStack>
                </VStack>

                <VStack flex="300px" gap="20px">
                  {/* Тема заявки */}
                  <FormField label="Тема заявки" error={errors.about}>
                    <Textarea
                      resize="none"
                      {...register("about")}
                      height="70px"
                      placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
                      _placeholder={{
                        base: {
                          fontSize: "12px",
                          lineHeight: "100%",
                        },
                        md: {
                          fontSize: "14px",
                          lineHeight: "100%",
                        },
                      }}
                    />
                  </FormField>

                  {/* Приоритет */}
                  <FormField label="Приоритет" error={errors.priority}>
                    <FormSelect
                      name="priority"
                      control={control}
                      options={priorityOptions}
                      placeholder="Выберите приоритет"
                    />
                  </FormField>

                  {/* Описание */}
                  <FormField
                    label="Описание проблемы"
                    error={errors.description}
                  >
                    <Textarea
                      resize="none"
                      height="164px"
                      {...register("description")}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />

                    {showAboutPlaceholder && <DescriptionPlaceholder />}
                  </FormField>

                  {/* Файлы */}
                  {!isMobile && (
                    <FileUploadField
                      control={control as Control<CreateTicketForm>}
                      setValue={setValue as UseFormSetValue<CreateTicketForm>}
                      setError={setError}
                    />
                  )}
                </VStack>
              </HStack>
            </Dialog.Body>

            <Dialog.Footer
              p={{ base: "24px 16px 24px 16px", md: "34px 34px 38px 34px" }}
              justifyContent="start"
              flexDirection={{ base: "column", md: "row" }}
            >
              {isMobile && (
                <FileUploadField
                  control={control as Control<CreateTicketForm>}
                  setValue={setValue as UseFormSetValue<CreateTicketForm>}
                  setError={setError}
                />
              )}

              <ButtonCustom
                variant="dark"
                borderRadius="5px"
                width={{ base: "100%", md: "auto" }}
                padding={{ base: "13px 12px", md: "8px 20px" }}
                onClick={handleSubmit(onSubmit)}
              >
                Создать заявку
              </ButtonCustom>

              <ButtonCustom
                display={{ base: "none", md: "flex" }}
                onClick={onClose}
                variant="white"
                borderRadius="5px"
              >
                Отмена
              </ButtonCustom>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateTicketModal;
