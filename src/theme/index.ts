import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { linkRecipe } from "@/theme/recipes/link.recipe.ts";

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
      link: linkRecipe,
    },
  },
});

export default system;
