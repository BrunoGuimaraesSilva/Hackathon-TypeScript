import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Image as ImageChakra,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import Image from "next/image";
import { useForm } from "react-hook-form";

import logo from "../../assets/logo.svg";
import { BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useContext, useState } from "react";
import { ClientContext } from "../../contexts";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const clickButtonShowPassword = () => setShowPassword(!showPassword);
  const { login } = useContext(ClientContext);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data: any) {
    login(data.email, data.password);
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Center>
          <Stack spacing={4} h={"full"} w={"full"} maxW={"900px"}>
            <Flex align={"center"}>
              <Center w="80px">
                <Image alt="" src={logo} />
              </Center>
            </Flex>
            <Heading fontSize={"2xl"}>Login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl h={"100px"} isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <MdOutlineEmail />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Seu Email"
                    {...register("email", {
                      required: "Preencha o campo de E-mail",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl h={"100px"} isInvalid={errors.password}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <MdLockOutline />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua Senha"
                    {...register("password", {
                      required: "Preencha o campo de senha",
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={clickButtonShowPassword}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  mt={15}
                  colorScheme="blue"
                  bg="blue.400"
                  color="white"
                  isLoading={isSubmitting}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
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
