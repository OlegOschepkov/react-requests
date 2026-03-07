import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Stack,
  Wrap,
  Button,
  Input,
  Avatar,
  Circle,
  IconButton, Float
} from '@chakra-ui/react';
import { Plus, Search} from 'lucide-react';

const filters = [
  "Все",
  "Активные",
  "Черновики",
  "Архив",
  "Удалённые",
  "Избранное"
];

export default function Interface() {
  const [active, setActive] = useState(0);

  return (
    <Container maxW="1200px" py={{ base: 4, md: 6 }}>
      <Stack gap={6}>

        {/* Top bar */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <HStack gap={3}>
            <Avatar.Root>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Circle
                  bg="green.500"
                  size="8px"
                  outline="0.2em solid"
                  outlineColor="bg"
                />
              </Float>
            </Avatar.Root>
          </HStack>

          <Button
            bg="gray.200"
            _hover={{ bg: "gray.300" }}
            w={{ base: "100%", md: "auto" }}
          >
            Выйти
          </Button>
        </Flex>

        {/* Search + actions */}
        <Flex
          gap={3}
          direction={{ base: "column", lg: "row" }}
          align="stretch"
        >
          <Box position="relative" flex="1">
            <Box
              position="absolute"
              left="10px"
              top="50%"
              transform="translateY(-50%)"
              opacity={0.6}
            >
              <Search size={16} />
            </Box>

            <Input
              placeholder="Поиск..."
              pl="34px"
              size="md"
              bg="white"
            />
          </Box>

          <HStack
            gap={3}
            w={{ base: "100%", lg: "auto" }}
            flexWrap="wrap"
          >
            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              w={{ base: "100%", sm: "auto" }}
            >
              Экспорт
            </Button>

            <Button
              bg="gray.200"
              _hover={{ bg: "gray.300" }}
              w={{ base: "100%", sm: "auto" }}
            >
              Новая
            </Button>
          </HStack>
        </Flex>

        {/* Filters */}
        <Flex align="center" gap={3} wrap="wrap">
          <Wrap>
            {filters.map((f, i) => (
              <Button
                key={f}
                size="sm"
                px={4}
                bg={active === i ? "black" : "gray.200"}
                color={active === i ? "white" : "black"}
                _hover={{
                  bg: active === i ? "gray.800" : "gray.300"
                }}
                onClick={() => setActive(i)}
              >
                {f}
              </Button>
            ))}
          </Wrap>

          <IconButton aria-label="add">
            <Plus size={16} />
          </IconButton>
        </Flex>

      </Stack>
    </Container>
  );
}
