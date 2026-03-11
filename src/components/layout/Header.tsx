import {
  Avatar,
  Box,
  Button,
  Flex,
  Float,
  HStack,
  Text,
  Menu,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import PageContainer from "@/components/layout/PageContainer.tsx";
import LinkCustom from "@/components/ui/link-custom.tsx";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box borderBottom="1px solid" borderColor={""}>
      <PageContainer>
        <HStack align="center" justify="space-between">
          {isMobile ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton aria-label="Меню" variant="ghost">
                  <MenuIcon size={24} />
                </IconButton>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="tickets" asChild>
                    <LinkCustom href="#">Заявки</LinkCustom>
                  </Menu.Item>

                  <Menu.Item value="reports" asChild>
                    <LinkCustom href="#" pointerEvents="none">
                      Отчёты
                    </LinkCustom>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ) : (
            <HStack gap="14px">
              <LinkCustom href="#">Заявки</LinkCustom>
              <LinkCustom href="#">Отчёты</LinkCustom>
            </HStack>
          )}

          <HStack gap="18px">
            <Avatar.Root>
              <Avatar.Fallback name="Анна Иванова" />
              <Avatar.Image src="user-avatar.png" />
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bg="nokColor"
                  width="20px"
                  height="20px"
                  borderRadius="50%"
                >
                  <Text color="white" fontSize="13px" lineHeight="100%">
                    2
                  </Text>
                </Flex>
              </Float>
            </Avatar.Root>
            <Button
              bg="nokColor"
              _hover={{ bg: "gray.300" }}
              w={{ base: "100%", md: "auto" }}
            >
              Выйти
            </Button>
          </HStack>
        </HStack>
      </PageContainer>
    </Box>
  );
};

export default Header;
