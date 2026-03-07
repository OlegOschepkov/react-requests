import { Container } from "@chakra-ui/react"
import type {ReactNode} from 'react';

interface PageContainerProps {
  children: ReactNode | ReactNode[];
}

export default function PageContainer({ children } : PageContainerProps) {
  return (
    <Container
      maxW="1920px"
      px={{ base: 4, md: 6, lg: 8 }}
      py={6}
    >
      {children}
    </Container>
  )
}
