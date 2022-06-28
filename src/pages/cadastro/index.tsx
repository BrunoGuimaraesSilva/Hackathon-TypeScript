import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Select,
  useColorModeValue,
  useToast,
  VStack,
  Wrap,
  WrapItem,
  Divider,
} from "@chakra-ui/react";

import InputMask from "react-input-mask";
import React, { useContext, useEffect, useState } from "react";
import { BsPerson, BsEye, BsEyeSlash } from "react-icons/bs";
import {
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineDocumentScanner,
  MdOutlineLocationCity,
  MdOutlineStreetview,
  MdOutlineHouse,
  MdLockOutline,
} from "react-icons/md";
import { Footer, Header } from "../../components";
import { useForm } from "react-hook-form";
import { ClientContext } from "../../contexts";
import { CheckIcon } from "@chakra-ui/icons";
import uf from "../../assets/uf.json";
import { defaultUserFormData } from "../../utils/client";
export default function Form() {
  const {
    cep,
    perfil,
    getCepData,
    createUser,
    getProfile,
    editUser,
    clientToEdit,
    setClientToEdit,
  } = useContext(ClientContext);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<string>("Cadastrar");
  const [requirePassword, setRequirePassword] = useState<string | boolean>(
    "Preencha o campo de senha"
  );

  const clickButtonShowPassword = () => setShowPassword(!showPassword);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data: any): Promise<void> {
    if (data.id) {
      editUser(data);
    } else {
      createUser(data);
    }
  }

  useEffect(() => {
    setValue("city", cep?.localidade ?? "", {
      shouldValidate: cep?.localidade ? true : false,
    });
    setValue("neighborhood", cep?.bairro ?? "", {
      shouldValidate: cep?.bairro ? true : false,
    });
    setValue("address", cep?.logradouro ?? "", {
      shouldValidate: cep?.logradouro ? true : false,
    });
    setValue("state", cep?.uf ?? "", {
      shouldValidate: cep?.uf ? true : false,
    });

    if (!!cep?.erro) {
      toast({
        title: "Cep Inválido",
        description: "Digite um cep valido!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [cep]);

  useEffect(() => {
    const value = getValues("cep");
    if (value) {
      if (value.indexOf("_") == -1) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  }, [watch()]);

  useEffect(() => {
    getProfile();
    if (clientToEdit?.id) {
      setTextButton("Editar");
      setRequirePassword(false);
      setValue("id", clientToEdit?.id);
      setValue("name", clientToEdit?.name);
      setValue("phone", clientToEdit?.phone);
      setValue("cpf", clientToEdit?.cpf);
      setValue("cep", clientToEdit?.cep, { shouldValidate: false });
      setValue("city", clientToEdit?.city);
      setValue("state", clientToEdit?.state);
      setValue("address", clientToEdit?.address);
      setValue("neighborhood", clientToEdit?.neighborhood);
      setValue("houseNumber", clientToEdit?.houseNumber);
      setValue("email", clientToEdit?.email);
      setValue("profile", clientToEdit?.profile);
    }

    return () => {
      reset()
      setClientToEdit(defaultUserFormData)
    };
  }, []);
  
  return (
    <>
      <Header />
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        align="center"
        justify="center"
        id="contact"
        w={"100%"}
      >
        <Box w={"100%"} m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
          <Box w={"100%"}>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <Stack
                borderRadius="lg"
                spacing={{ base: 4, md: 8, lg: 20 }}
                direction={{ base: "column", md: "row" }}
                w={"100%"}
              >
                <Box
                  bg={useColorModeValue("white", "gray.700")}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue("gray.700", "whiteAlpha.900")}
                  shadow="base"
                  w={"100%"}
                >
                  <VStack spacing={1}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Input
                        id="id"
                        display={"none"}
                        placeholder="Seu Nome"
                        {...register("id")}
                      />
                      <Wrap spacing={5}>
                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.name}>
                            <FormLabel>Nome</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <BsPerson />
                              </InputLeftElement>
                              <Input
                                id="name"
                                placeholder="Seu Nome"
                                {...register("name", {
                                  required: "Preencha o campo de Nome",
                                  minLength: {
                                    value: 4,
                                    message: "Preencha corretamente o campo",
                                  },
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.name && errors.name.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.phone}>
                            <FormLabel>Telefone</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlinePhone />
                              </InputLeftElement>
                              <Input
                                as={InputMask}
                                placeholder="Seu Telefone"
                                mask="(99) 99999-9999"
                                {...register("phone", {
                                  required: "Preencha o campo de Telefone",
                                  minLength: {
                                    value: 4,
                                    message: "Preencha corretamente o campo",
                                  },
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.phone && errors.phone.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.cpf}>
                            <FormLabel>CPF</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineDocumentScanner />
                              </InputLeftElement>
                              <Input
                                as={InputMask}
                                placeholder="Seu CPF"
                                mask="999.999.999-99"
                                {...register("cpf", {
                                  required: "Preencha o campo de CPF",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.cpf && errors.cpf.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <Divider orientation="horizontal" />

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.cep}>
                            <FormLabel>CEP</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineLocationCity />
                              </InputLeftElement>
                              <Input
                                as={InputMask}
                                placeholder="Seu CEP"
                                mask="99999-999"
                                {...register("cep", {
                                  required: "Preencha o campo de CEP",
                                  minLength: 9,
                                })}
                              />
                              <InputRightElement width="4.5rem">
                                <Button
                                  disabled={disableButton}
                                  size="sm"
                                  onClick={() => {
                                    getCepData(getValues("cep"));
                                  }}
                                >
                                  <CheckIcon color="green.500" />
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.cep && errors.cep.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.city}>
                            <FormLabel>Cidade</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineLocationCity />
                              </InputLeftElement>
                              <Input
                                placeholder="Seu Cidade"
                                {...register("city", {
                                  required: "Preencha o campo de Cidade",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.city && errors.city.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.state}>
                            <FormLabel>Estado</FormLabel>
                            <InputGroup>
                              <Select
                                id="country"
                                placeholder="Selecione seu estado"
                                {...register("state", {
                                  required: "Selecione o seu Estado",
                                })}
                              >
                                {uf.map((data) => {
                                  return (
                                    <option
                                      key={data.id}
                                      id={data.id}
                                      value={data.initials}
                                    >
                                      {data.name}
                                    </option>
                                  );
                                })}
                              </Select>
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.state && errors.state.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.address}>
                            <FormLabel>Endereço</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineHouse />
                              </InputLeftElement>
                              <Input
                                placeholder="Seu Endereço"
                                {...register("address", {
                                  required: "Preencha o campo de Endereço",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.address && errors.address.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.neighborhood}>
                            <FormLabel>Bairro</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineHouse />
                              </InputLeftElement>
                              <Input
                                placeholder="Seu Bairro"
                                {...register("neighborhood", {
                                  required: "Preencha o campo de Bairro",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.neighborhood &&
                                errors.neighborhood.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.houseNumber}>
                            <FormLabel>Número</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdOutlineStreetview />
                              </InputLeftElement>
                              <Input
                                placeholder="Seu Número"
                                {...register("houseNumber", {
                                  required: "Preencha o campo de Número",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.houseNumber && errors.houseNumber.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <Divider orientation="horizontal" />

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.email}>
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
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.password}>
                            <FormLabel>Senha</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <MdLockOutline />
                              </InputLeftElement>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Sua Senha"
                                {...register("password", {
                                  required: requirePassword,
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
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.profile}>
                            <FormLabel>Perfil</FormLabel>
                            <InputGroup>
                              <Select
                                id="profile"
                                placeholder="Selecione seu perfil"
                                {...register("profile", {
                                  required: "Selecione o seu perfil",
                                })}
                              >
                                {perfil?.map((data) => {
                                  return (
                                    <option
                                      key={data.id}
                                      id={`${data.id}`}
                                      value={data.id}
                                    >
                                      {data.descricao}
                                    </option>
                                  );
                                })}
                              </Select>
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.profile && errors.profile.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>
                      </Wrap>

                      <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        isLoading={isSubmitting}
                        type="submit"
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        {textButton}
                      </Button>
                    </form>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
