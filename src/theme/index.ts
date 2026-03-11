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
  },
});

export default system;
