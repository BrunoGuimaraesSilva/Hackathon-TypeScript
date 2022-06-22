import { ReactNode, useContext, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useDisclosure,
  Stack,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { GButton, GIconButton } from "../Button";
import logo from '../../assets/logo.svg'
export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderBottom="1px solid" borderColor="gray.700" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <GIconButton
            size={"md"}
            mr={5}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box w="full">
            <Center justifyContent={"center"} w="70px">
              <Image alt="" src={logo} />
            </Center>
          </Box>
          <Box
            display={{ base: "none", md: "unset" }}
            zIndex={150}
            alignItems={"center"}
          >
            <Box display={{ base: "none", md: "unset" }}>
              <GButton>Cadastar</GButton>
            </Box>
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Box zIndex={150} alignItems={"center"}>
              <GButton w={'full'}>Cadastar</GButton>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
