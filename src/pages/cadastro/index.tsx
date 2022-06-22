import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import React, { useContext } from "react";
import { BsPerson } from "react-icons/bs";
import {
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineDocumentScanner,
  MdOutlineLocationCity,
  MdOutlineStreetview,
  MdOutlineHouse,
} from "react-icons/md";
import { Footer } from "../../components";
import { useForm } from "react-hook-form";
import { ClientContext } from "../../contexts";
import { CheckIcon } from "@chakra-ui/icons";

export default function Form() {
  const { cep, getCepData } = useContext(ClientContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  function searchCep() {
    
  }

  console.log(errors);

  return (
    <>
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
                      <Wrap spacing={5}>
                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.name}>
                            <FormLabel>Nome</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<BsPerson />} />
                              <Input
                                id="name"
                                placeholder="Seu Nome"
                                {...register("name", {
                                  required: "Preencha o campo de Nome",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.name && errors.name.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<MdOutlineEmail />} />
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
                          <FormControl isInvalid={errors.phone}>
                            <FormLabel>Telefone</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<MdOutlinePhone />} />
                              <Input
                                as={InputMask}
                                placeholder="Seu Telefone"
                                mask="(99) 99999-9999"
                                {...register("phone", {
                                  required: "Preencha o campo de Telefone",
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
                              <InputLeftElement
                                children={<MdOutlineDocumentScanner />}
                              />
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

                        <WrapItem w={"250px"} h={"100px"}>
                          <FormControl isInvalid={errors.cep}>
                            <FormLabel>CEP</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                children={<MdOutlineLocationCity />}
                              />
                              <Input
                                as={InputMask}
                                placeholder="Seu CEP"
                                mask="99999-999"
                                {...register("cep", {
                                  required: "Preencha o campo de CEP",
                                })}
                              />
                              <InputRightElement width="4.5rem">
                                <Button size="sm" onClick={(data) => console.log(data)}>
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
                              <InputLeftElement
                                children={<MdOutlineLocationCity />}
                              />
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
                          <FormControl isInvalid={errors.address}>
                            <FormLabel>Endereço</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<MdOutlineHouse />} />
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
                              <InputLeftElement children={<MdOutlineHouse />} />
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
                              <InputLeftElement
                                children={<MdOutlineStreetview />}
                              />
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
                        Send Message
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
