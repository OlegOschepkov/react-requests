import {Button, HStack} from '@chakra-ui/react';
import Interface from '@/components/Interface.tsx';
import {ColorModeButton} from '@/components/ui/color-mode.tsx';

function App() {
  return (
    <HStack>
      <Interface />
      <ColorModeButton>Click me</ColorModeButton>
    </HStack>
  )
}

export default App
