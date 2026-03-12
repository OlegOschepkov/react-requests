import {
  Avatar,
  Box,
  Flex,
  Float,
  HStack,
  Menu,
  IconButton,
  Icon,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import PageContainer from "@/components/layout/PageContainer.tsx";
import LinkCustom from "@/components/ui/link-custom.tsx";
import { MenuIcon } from "lucide-react";
import { LuLogOut, LuTriangle } from "react-icons/lu";
import ButtonCustom from "@/components/ui/button-custom.tsx";
import CustomText from "@/components/ui/custom-text.tsx";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box borderBottom="1px solid" borderColor={"grey.100"}>
      <PageContainer>
        <HStack
          align="center"
          justify="space-between"
          py={{ md: "16px", lg: "22px" }}
        >
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
            <HStack gap="35px" mx="90px 0">
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
                    gap="4px"
                    outline="none"
                    _hover={{
                      bgColor: "transparent",
                    }}
                  >
                    <LinkCustom as="p" variant={"menu"}>
                      Справочники
                    </LinkCustom>
                    <Icon
                      as={LuTriangle}
                      fill="inherit"
                      boxSize="7px"
                      transform="rotate(180deg)"
                    />
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

          <HStack gap="25px">
            <Link href="#">
              <Avatar.Root
                my="-3px 0"
                transition="all 0.2s"
                _hover={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}
              >
                <Avatar.Fallback name="Анна Иванова" />
                <Avatar.Image w="35px" h="35px" src="/user-avatar.png" />
                <Float placement="bottom-end" offsetX="1" offsetY="2">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg="red"
                    width="20px"
                    height="20px"
                    borderRadius="50%"
                  >
                    <CustomText color="white" variant="p" lineHeight="100%">
                      2
                    </CustomText>
                  </Flex>
                </Float>
              </Avatar.Root>
            </Link>
            <ButtonCustom gap="4px">
              <Icon as={LuLogOut} boxSize="20px" />
              Выйти
            </ButtonCustom>
          </HStack>
        </HStack>
      </PageContainer>
    </Box>
  );
};

export default Header;
