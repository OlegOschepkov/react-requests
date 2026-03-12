import {
  Box,
  Image,
  HStack,
  CloseButton,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "@/mockData/mockData.ts";
import CustomText from "@/components/ui/custom-text.tsx";
import ImgIcon from "@/components/ui/icon-img.tsx";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import { LuPlus } from "react-icons/lu";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  onError?: (error?: string) => void;
}

const FileUploadComponent = ({ onChange, onError }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);

    const validFiles = newFiles.filter((file) => {
      if (!(ALLOWED_FILE_TYPES as readonly string[]).includes(file.type)) {
        onError?.("Разрешены только JPG, PNG, WEBP");
        return false;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        onError?.(`Максимальный размер файла ${MAX_FILE_SIZE_MB}MB`);
        return false;
      }

      if (files.length >= MAX_FILES) {
        onError?.(`Можно загрузить максимум ${MAX_FILES} файлов`);
        return false;
      }

      return true;
    });

    console.log("Валидные файлы:", validFiles);

    if (validFiles.length === 0) {
      return;
    }

    const updatedFiles = [...files, ...validFiles].slice(0, MAX_FILES);
    const newPreviews = updatedFiles.map((file) => URL.createObjectURL(file));

    setFiles(updatedFiles);
    setPreviews(newPreviews);
    onChange(updatedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);

    onChange(newFiles);
  };

  return (
    <>
      <ButtonCustom
        display={{ base: "flex", md: "none" }}
        gap="18px"
        fontSize="16px !important"
        fontWeight="500"
        padding="13px 12px"
        whiteSpace="nowrap"
        alignItems="center"
        width="100%"
        border="none !important"
        boxShadow="none"
        onClick={() => inputRef.current?.click()}
      >
        <Icon as={LuPlus} boxSize="20px" />
        Прикрепить файлы
      </ButtonCustom>

      <VStack
        display={{ base: "none", md: "flex" }}
        border="1px dashed"
        borderColor="grey.200"
        borderRadius="14px"
        width="100%"
        height="100px"
        align="center"
        justify="center"
        gap="6px"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <CustomText variant="p1" fontWeight="300">
          Выберите или перетащите фото или файл
        </CustomText>

        <ImgIcon boxSize="24px" />
      </VStack>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={handleInputChange}
      />

      {previews.length > 0 && (
        <HStack wrap="wrap" mt={4}>
          {previews.map((src, index) => (
            <Box key={index} position="relative">
              <Image
                src={src}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
              />

              <Box position="absolute" top="2px" right="2px">
                <CloseButton
                  size="sm"
                  bg="white"
                  onClick={() => removeFile(index)}
                />
              </Box>
            </Box>
          ))}
        </HStack>
      )}
    </>
  );
};
export default FileUploadComponent;
