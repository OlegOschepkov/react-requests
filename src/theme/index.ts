import { createSystem, defaultConfig } from "@chakra-ui/react"
import { colors } from "./colors"
import { semanticTokens } from "./semanticTokens"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
    },
    semanticTokens,
  },
})

export default system;
