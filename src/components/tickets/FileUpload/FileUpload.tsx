import {
  Box,
  Image,
  HStack,
  CloseButton,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MAX_FILES } from "@/mockData/mockData.ts";
import CustomText from "@/components/ui/custom-text.tsx";
import { LuImage, LuTriangle } from "react-icons/lu";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  error?: string;
  invalid?: boolean;
}
const FileUploadComponent = ({ onChange }: FileUploadProps) => {
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
    const updatedFiles = [...files, ...newFiles].slice(0, MAX_FILES);
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
      <VStack
        border="1px dashed"
        borderColor="grey.200"
        borderRadius="14px"
        width="100%"
        height="100px"
        align="center"
        justify="center"
        gap="12px"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <CustomText variant="p1" fontWeight="300">
          Выберите или перетащите фото или файл
        </CustomText>

        <Icon as={LuImage} boxSize="20px" />

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleInputChange}
        />
      </VStack>

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
