import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { semanticTokens } from "./semanticTokens";

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
    semanticTokens,
  },
});

export default system;
