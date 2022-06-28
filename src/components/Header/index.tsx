import { ReactNode, useContext, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useDisclosure,
  Stack,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import { GButton, GIconButton } from "../Button";
import logo from "../../assets/logo.svg";
import { useRouter } from "next/router";
export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
            <Center
              onClick={() => {
                router.push("/dashboard");
              }}
              justifyContent={"center"}
              w="70px"
            >
              <Image alt="" src={logo} />
            </Center>
          </Box>
          <Box
            display={{ base: "none", md: "unset" }}
            zIndex={150}
            alignItems={"center"}
          >
            <Box display={{ base: "none", md: "unset" }}>
              <Stack direction="row" spacing={4} align="center">
                <Menu key={1}>
                  <MenuButton
                    key={1.1}
                    as={Button}
                    transition="all 0.2s"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    Pesquisas <ChevronDownIcon />
                  </MenuButton>
                  <MenuList key={2}>
                    <MenuItem
                      key={3.3}
                      onClick={() => {
                        router.push("/cadastro/pesquisa");
                      }}
                    >
                      Cadastro
                    </MenuItem>

                    <MenuDivider />
                    <MenuItem
                      key={2.2}
                      onClick={() => {
                        router.push("/listagem/pesquisas");
                      }}
                    >
                      Listagem
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    key={3}
                    as={Button}
                    transition="all 0.2s"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    Usuário <ChevronDownIcon />
                  </MenuButton>
                  <MenuList key={3.1}>
                    <MenuItem
                      key={3.2}
                      onClick={() => {
                        router.push("/cadastro/usuario");
                      }}
                    >
                      Cadastro
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem
                      key={2.1}
                      onClick={() => {
                        router.push("/listagem/usuarios");
                      }}
                    >
                      Listagem
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Box>
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Box zIndex={150} alignItems={"center"}>
                <GButton
                  mb={5}
                  w={"full"}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </GButton>

                <Menu key={1}>
                  <MenuButton
                    key={1.1}
                    mb={5}
                    w={'full'}
                    as={Button}
                    transition="all 0.2s"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    Pesquisas <ChevronDownIcon />
                  </MenuButton>
                  <MenuList key={2}>
                    <MenuItem
                      key={3.3}
                      onClick={() => {
                        router.push("/cadastro/pesquisa");
                      }}
                    >
                      Cadastro
                    </MenuItem>

                    <MenuDivider />
                    <MenuItem
                      key={2.2}
                      onClick={() => {
                        router.push("/listagem/pesquisas");
                      }}
                    >
                      Listagem
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    key={3}
                    w={'full'}
                    as={Button}
                    transition="all 0.2s"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    Usuário <ChevronDownIcon />
                  </MenuButton>
                  <MenuList key={3.1}>
                    <MenuItem
                      key={3.2}
                      onClick={() => {
                        router.push("/cadastro/usuario");
                      }}
                    >
                      Cadastro
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem
                      key={2.1}
                      onClick={() => {
                        router.push("/listagem/usuarios");
                      }}
                    >
                      Listagem
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
