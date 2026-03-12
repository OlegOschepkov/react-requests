import {
  Dialog,
  Portal,
  Field,
  VStack,
  Checkbox,
  HStack,
  Box,
  Textarea,
  List,
  IconButton,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  categoryOptions,
  priorityOptions,
  locOptions,
} from "./createTicketOptions";
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
import CustomText from "@/components/ui/custom-text.tsx";
import PriorityBadge from "@/components/tickets/TicketTable/PriorityBadge.tsx";
import { LuArrowLeft, LuX } from "react-icons/lu";
import { createTicketFromForm } from "@/components/tickets/CreateTicketModal/useCreateTicketSubmit.tsx";
import DescriptionPlaceholder from "@/components/tickets/CreateTicketModal/DescriptionPlaceholder.tsx";
import FileUploadField from "@/components/tickets/CreateTicketModal/FileUploadField.tsx";

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

  const aboutValue = watch("about");
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
                <VStack flex="300px" gap={{ base: "24px", md: "56px" }}>
                  {/* Аптека */}
                  <Field.Root invalid={!!errors.locId} gap="10px">
                    <Field.Label fontSize="12px" lineHeight="100%">
                      Аптека
                    </Field.Label>

                    <FormSelect<CreateTicketForm>
                      name="locId"
                      control={control}
                      options={locOptions}
                      placeholder="Выберите аптеку от которой исходит заявка"
                      minHeight="48px"
                    />

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.locId?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <VStack width="100%" gap="16px">
                    {/* Категория */}
                    <Field.Root invalid={!!errors.category} gap="10px">
                      <Field.Label fontSize="12px" lineHeight="100%">
                        Категория заявки
                      </Field.Label>

                      <FormSelect<CreateTicketForm>
                        name="category"
                        control={control}
                        options={categoryOptions}
                        placeholder="Холодильники, кондиционеры или другое"
                      />

                      <Field.ErrorText
                        color="red"
                        position="absolute"
                        bottom="-15px"
                      >
                        {errors.category?.message}
                      </Field.ErrorText>
                    </Field.Root>

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

                <VStack flex="300px" gap="25px">
                  {/* Тема с кастомным плейсхолдером */}
                  <Field.Root invalid={!!errors.about} gap="10px">
                    <Field.Label fontSize="12px" lineHeight="100%">
                      Тема заявки
                    </Field.Label>

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

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.about?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Приоритет */}
                  <Field.Root invalid={!!errors.status} gap="10px">
                    <Field.Label fontSize="12px" lineHeight="100%">
                      Приоритет
                    </Field.Label>

                    <FormSelect<CreateTicketForm>
                      name="priority"
                      control={control}
                      options={priorityOptions}
                      placeholder="Выберите приоритет"
                    />

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.priority?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Описание */}
                  <Field.Root invalid={!!errors.description} gap="10px">
                    <Field.Label fontSize="12px" lineHeight="100%">
                      Описание проблемы
                    </Field.Label>

                    <Textarea
                      resize="none"
                      height="164px"
                      {...register("description")}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />

                    {showAboutPlaceholder && <DescriptionPlaceholder />}

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.description?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Файлы */}
                  {!isMobile && (
                    <FileUploadField
                      control={control}
                      setValue={setValue}
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
                  control={control}
                  setValue={setValue}
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
