import { Box, Text, Image, HStack, CloseButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MAX_FILES } from "@/constants/ticketStatuses.ts";

interface FileUploadProps {
  maxSizeMB?: number;
  onChange: (files: File[]) => void;
}

const FileUploadComponent = ({ maxSizeMB = 5, onChange }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const maxSize = maxSizeMB * 1024 * 1024;

  const processFiles = (fileList: FileList) => {
    const validFiles: File[] = [];
    const previewUrls: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxSize) {
        alert(`Файл ${file.name} больше ${maxSizeMB}MB`);
        return;
      }

      if (files.length + validFiles.length > MAX_FILES) {
        alert(`Можно загрузить максимум ${MAX_FILES} файлов`);
        return;
      }

      validFiles.push(file);
      previewUrls.push(URL.createObjectURL(file));
    });

    const updatedFiles = [...files, ...validFiles];
    const updatedPreviews = [...previews, ...previewUrls];

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

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
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);

    onChange(newFiles);
  };

  return (
    <>
      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="lg"
        p={6}
        textAlign="center"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Text>Перетащите файлы сюда или нажмите для загрузки</Text>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleInputChange}
        />
      </Box>

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
