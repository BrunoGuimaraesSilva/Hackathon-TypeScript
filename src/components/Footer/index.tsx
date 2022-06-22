import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "black.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        ></Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2022 BBL. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
