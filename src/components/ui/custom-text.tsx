import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

type TextVariant = "p" | "p1" | "p2" | "base100" | "h2";

interface TextCustomProps extends HTMLChakraProps<"p"> {
  variant?: TextVariant;
  fullWidth?: boolean;
}

const StyledText = chakra("p", {
  base: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "24px",
    color: "grey.700",
  },

  variants: {
    variant: {
      base100: {
        lineHeight: "100%",
      },

      p: {
        fontSize: "13px",
      },

      p1: {
        fontSize: "14px",
      },

      p2: {
        base: {
          fontSize: "12px",
          lineHeight: "100%",
        },
        md: {
          fontSize: "14px",
          lineHeight: "100%",
        },
      },

      h2: {
        fontWeight: 500,
        fontSize: "24px",
        lineHeight: "100%",
        color: "grey.700",
      },
    },
  },
});

const CustomText = ({ children, variant, ...props }: TextCustomProps) => {
  return (
    <StyledText variant={variant} {...props}>
      {children}
    </StyledText>
  );
};

export default CustomText;
