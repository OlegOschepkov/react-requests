import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      fonts: {
        heading: {
          value: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        },
        body: {
          value: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        },
      },
    },

    recipes: {
      field: {
        base: {
          gap: "10px",
          bg: "red !important",
        },
      },

      input: {
        base: {
          fontSize: "14px",
          lineHeight: "24px",
          borderRadius: "6px",
          bg: "white",
        },

        variants: {
          variant: {
            outline: {
              borderColor: "grey.200",
              transition: "border-color 0.2s",

              _hover: {
                borderColor: "grey.700",
              },

              _focus: {
                borderColor: "grey.700",
                boxShadow: "none",
              },
            },
          },
        },
      },

      textarea: {
        base: {
          fontSize: "14px",
          lineHeight: "24px",
          borderRadius: "6px",
          bg: "white",
        },

        variants: {
          variant: {
            outline: {
              borderColor: "grey.200",
              transition: "border-color 0.2s",

              _hover: {
                borderColor: "grey.700",
              },

              _focus: {
                borderColor: "grey.700",
                boxShadow: "none",
              },
            },
          },
        },
      },
    },
  },
});

export default system;
