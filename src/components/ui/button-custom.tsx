import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

type ButtonVariant = "dark" | "noBorder" | "white";

interface ButtonCustomProps extends HTMLChakraProps<"button"> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const StyledButton = chakra("button", {
  base: {
    fontWeight: 400,
    lineHeight: "24px",
    fontSize: { base: "14px", md: "16px !important" },
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

    "&[data-selected]": {
      bg: "grey.700",
      color: "grey.50 !important",
      borderColor: "black",

      _before: {
        display: "none !important",
      },
    },
  },

  variants: {
    variant: {
      dark: {
        bg: "grey.700",
        color: "grey.50",
        fontSize: { base: "16px", md: "16px !important" },

        _hover: {
          bg: "grey.700",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
      },

      white: {
        bg: "white",
        color: "grey.700",
        borderColor: "grey.700",
      },

      noBorder: {
        border: "none",
        padding: {
          base: "6px 12px !important",
          md: "8px 19px 8px 18px !important",
        },
        height: "auto !important",
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
