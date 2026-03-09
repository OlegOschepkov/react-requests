import { Box, Text, Image, HStack, CloseButton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MAX_FILES } from "@/constants/ticketStatuses.ts";

interface FileUploadProps {
  onChange: (files: File[]) => void;
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
