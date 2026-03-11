import { defineRecipe } from "@chakra-ui/react";

export const linkRecipe = defineRecipe({
  base: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "grey.700",
    transition: "all 0.2s",
    textDecoration: "none",
  },

  variants: {
    variant: {
      disabled: {
        color: "grey.200",
        pointerEvents: "none",
      },
    },
  },
});
