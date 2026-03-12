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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
import { LuTriangle, LuX } from "react-icons/lu";

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
  const priorityOptions = mapRecordToOptions(PRIORITY_LABELS).map((label) => ({
    value: label.value,
    label: <PriorityBadge status={label.value} variant="select" />,
  }));

  const locOptions = formLocValues.map((loc) => ({
    value: loc.id,
    label: (
      <Box>
        <CustomText
          as="span"
          bg="grey.50"
          borderRadius="4px"
          fontWeight="600"
          letterSpacing="8%"
          padding="1px 3px"
          marginRight="9px"
        >
          {loc.id}
        </CustomText>
        {loc.name}
      </Box>
    ),
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
        id: `T-${Date.now()}`.slice(-4),
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
            <Dialog.Header padding="33px 37px">
              <Dialog.CloseTrigger asChild>
                <Box position="absolute" top="25px" right="33px">
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    onClick={onClose}
                  >
                    <Icon as={LuX} boxSize="32px" />
                  </IconButton>
                </Box>
              </Dialog.CloseTrigger>
              <Dialog.Title fontWeight="500" fontSize="24px" lineHeight="100%">
                Создание заявки
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body width="100%" padding="3px 37px">
              <HStack
                wrap="wrap"
                gap="36px"
                as="form"
                align="top"
                onSubmit={handleSubmit(onSubmit)}
              >
                <VStack flex="300px" gap="54px">
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
                      {...register("about")}
                      height="70px"
                      placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
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
                      height="164px"
                      {...register("description")}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />

                    {showAboutPlaceholder && (
                      <Box
                        position="absolute"
                        left="16px"
                        top="33px"
                        pointerEvents="none"
                      >
                        <CustomText variant="p1" color="grey.200">
                          Кратко опишите проблему:
                        </CustomText>

                        <List.Root margin="16px 0 0 23px" gap="3px">
                          <CustomText
                            as="li"
                            variant="p1"
                            color="grey.200"
                            lineHeight="100%"
                          >
                            {" "}
                            что случилось?
                          </CustomText>
                          <CustomText
                            as="li"
                            variant="p1"
                            color="grey.200"
                            lineHeight="100%"
                          >
                            дата и время произошедшего?
                          </CustomText>
                          <CustomText
                            as="li"
                            variant="p1"
                            color="grey.200"
                            lineHeight="100%"
                          >
                            сколько длится проблема?
                          </CustomText>
                          <CustomText
                            as="li"
                            variant="p1"
                            color="grey.200"
                            lineHeight="100%"
                          >
                            насколько она влияет на вашу работу?
                          </CustomText>
                        </List.Root>
                      </Box>
                    )}

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.description?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Файлы */}
                  <Field.Root>
                    <Field.Label fontSize="12px" lineHeight="100%">
                      Прикрепите файлы
                    </Field.Label>

                    <FileUploadComponent
                      onChange={(files) =>
                        setValue("files", files, { shouldValidate: true })
                      }
                    />

                    <Field.ErrorText
                      color="red"
                      position="absolute"
                      bottom="-15px"
                    >
                      {errors.files?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </VStack>
              </HStack>
            </Dialog.Body>

            <Dialog.Footer p="34px 34px 38px 34px" justifyContent="start">
              <ButtonCustom
                variant="dark"
                borderRadius="5px"
                onClick={handleSubmit(onSubmit)}
              >
                Создать заявку
              </ButtonCustom>

              <ButtonCustom
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
