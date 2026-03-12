import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

type LinkVariant = "dark" | "light" | "menu" | "current";

interface LinkCustomProps extends HTMLChakraProps<"a"> {
  variant?: LinkVariant;
}

const StyledLink = chakra("a", {
  base: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "grey.700",
    transition: "all 0.2s",
    textDecoration: "none",
    position: "relative",

    _after: {
      content: '""',
      display: "block",
      position: "absolute",
      width: 0,
      height: "1px",
      bg: "grey.700",
      left: "50%",
      bottom: 0,
      transition: "all 0.2s",
    },

    _hover: {
      color: "grey.700",

      _after: {
        width: "100%",
        left: 0,
      },
    },
  },

  variants: {
    variant: {
      light: {
        color: "grey.200",
      },
      menu: {
        fontSize: { base: "20px", md: "16px" },
        fontWeight: { base: 600, md: 400 },
        color: { base: "grey.700", md: "grey.200" },

        _hover: {
          bgColor: "transparent",
        },

        _after: {
          display: "none",
        },
      },
      dark: {
        color: "grey.700",

        _after: {
          display: "none",
        },
      },
      current: {
        pointerEvents: "none",
        cursor: "default",

        _after: {
          display: "none",
        },
      },
    },
  },
});

const LinkCustom = ({ href, children, variant, ...props }: LinkCustomProps) => {
  return (
    <StyledLink href={href} variant={variant} {...props}>
      {children}
    </StyledLink>
  );
};

export default LinkCustom;
