import { Container } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode | ReactNode[];
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Container maxW="1920px" px={{ md: "16px", lg: "40px" }}>
      {children}
    </Container>
  );
};

export default PageContainer;
