import { Button, type ButtonProps } from "@chakra-ui/react";

const CustomButton = ({
  active,
  ...props
}: ButtonProps & { active?: boolean }) => {
  return (
    <Button
      size="sm"
      _hover={{
        bg: active ? "gray.800" : "gray.300",
      }}
      {...props}
    />
  );
};

export default CustomButton;
