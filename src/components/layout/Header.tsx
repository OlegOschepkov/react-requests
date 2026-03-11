import {
  Avatar,
  Box,
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
import { LuLogOut, LuTriangle } from "react-icons/lu";
import ButtonCustom from "@/components/ui/button-custom.tsx";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box borderBottom="1px solid" borderColor={"grey.100"}>
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
                    <LinkCustom href="#" variant={"current"}>
                      Заявки
                    </LinkCustom>
                  </Menu.Item>

                  <Menu.Item value="reports" asChild>
                    <LinkCustom href="#" variant={"light"}>
                      Отчёты
                    </LinkCustom>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ) : (
            <HStack gap="35px">
              <HStack gap="14px">
                <LinkCustom href="#" variant={"current"}>
                  Заявки
                </LinkCustom>
                <LinkCustom href="#" variant={"light"}>
                  Отчёты
                </LinkCustom>
              </HStack>

              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton
                    variant="ghost"
                    gap={"4px"}
                    outline={"none"}
                    _hover={{
                      bgColor: "transparent",
                    }}
                  >
                    <LinkCustom as="p" variant={"menu"}>
                      Справочники
                    </LinkCustom>
                    <LuTriangle fill={"inherit"} size={8} />
                  </IconButton>
                </Menu.Trigger>

                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="tickets" asChild>
                      <LinkCustom href="#" variant={"dark"}>
                        Ссылка меню 1
                      </LinkCustom>
                    </Menu.Item>

                    <Menu.Item value="reports" asChild>
                      <LinkCustom href="#" variant={"dark"}>
                        Ссылка меню 2
                      </LinkCustom>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </HStack>
          )}

          <HStack gap="18px">
            <Avatar.Root>
              <Avatar.Fallback name="Анна Иванова" />
              <Avatar.Image src="/user-avatar.png" />
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bg="red"
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
            <ButtonCustom gap="4px" variant={"base"}>
              <LuLogOut /> Выйти
            </ButtonCustom>
          </HStack>
        </HStack>
      </PageContainer>
    </Box>
  );
};

export default Header;
