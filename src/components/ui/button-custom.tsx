import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

type ButtonVariant = "base" | "dark";

interface ButtonCustomProps extends HTMLChakraProps<"button"> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const StyledButton = chakra("button", {
  base: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "8px 20px",
    borderRadius: "4px",
    transition: "all 0.2s",
    cursor: "pointer",
    border: "1px solid",
    borderColor: "grey.100",
    outline: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    backgroundColor: "grey.50",

    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },

    _focus: {
      outline: "none",
    },

    _active: {
      transform: "scale(0.98)",
    },
  },

  variants: {
    variant: {
      dark: {
        bg: "grey.700",
        color: "grey.50",

        _hover: {
          bg: "grey.700",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

const ButtonCustom = ({
  children,
  variant,
  fullWidth,
  ...props
}: ButtonCustomProps) => {
  return (
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

export default ButtonCustom;
