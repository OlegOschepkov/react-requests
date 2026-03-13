"use client"

import { ChakraProvider } from "@chakra-ui/react"
import system from '@/theme';
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "../../components/ui/color-mode.tsx"

export function ThemeProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
