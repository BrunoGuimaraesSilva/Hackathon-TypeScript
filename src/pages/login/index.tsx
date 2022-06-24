import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Image as ImageChakra
} from "@chakra-ui/react";

import Image from "next/image";

import logo from "../../assets/logo.svg";

export default function Login() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
   <Center>

        <Stack spacing={4} h={"full"} w={"full"} maxW={"900px"}>

         <Flex
          align={"center"}
          
        >
          <Center justifyContent={"center"} w="80px">
              <Image alt="" src={logo} />
            </Center>
        </Flex>
          <Heading fontSize={"2xl"}>Login</Heading>
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={"blue"} variant={"solid"}>
              Entrar
            </Button>
          </Stack>
        </Stack>
        </Center>
      </Flex>
      <Flex flex={1}>
        <ImageChakra
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
