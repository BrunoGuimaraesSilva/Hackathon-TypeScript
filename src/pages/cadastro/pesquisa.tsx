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
  Text,
  Stack,
  Select,
  useColorModeValue,
  useToast,
  VStack,
  Wrap,
  WrapItem,
  Divider,
  Textarea,
  RadioGroup,
  Radio,
  Switch,
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
  MdLockOpen,
} from "react-icons/md";
import { Footer, Header } from "../../components";
import { useForm } from "react-hook-form";
import { SearchContext } from "../../contexts";
import { CheckIcon } from "@chakra-ui/icons";
import uf from "../../assets/uf.json";
import { defaultUserFormData } from "../../utils/client";
import { defaultSearchFormData } from "../../utils/search";
export default function Pesquisa() {
  const { createSearch, editSearch, setSearchToEdit, SearchToEdit } = useContext(SearchContext);
  const [textButton, setTextButton] = useState<string>("Cadastrar");
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
      editSearch(data);
    } else {
      createSearch(data);
    }
  }

    useEffect(() => {
      if (SearchToEdit?.id) {
        setTextButton("Editar");
        setValue("id", SearchToEdit?.id);
        setValue("searchTheme", SearchToEdit?.searchTheme);
        setValue("body", SearchToEdit?.body);
        setValue("status", SearchToEdit?.status);
      }

      return () => {
        reset();
        setSearchToEdit(defaultSearchFormData);
      };
    }, []);

  console.log(watch());
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
                          <FormControl isInvalid={errors.searchTheme}>
                            <FormLabel>Tema</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                                <BsPerson />
                              </InputLeftElement>
                              <Input
                                id="searchTheme"
                                placeholder="Seu Tema"
                                {...register("searchTheme", {
                                  required: "Preencha o campo de Tema",
                                  minLength: {
                                    value: 4,
                                    message: "Preencha corretamente o campo",
                                  },
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.searchTheme && errors.searchTheme.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>
                      </Wrap>

                      <Wrap spacing={5}>
                        <WrapItem w={"250px"} h={"380px"}>
                          <FormControl isInvalid={errors.body}>
                            <FormLabel>Conteúdo</FormLabel>
                            <InputGroup>
                              <Textarea
                                resize={"none"}
                                id="body"
                                size="sm"
                                h={"300px"}
                                placeholder="Seu Conteúdo"
                                {...register("body", {
                                  required: "Preencha o campo de Conteúdo",
                                })}
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.body && errors.body.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>
                      </Wrap>
                      <Wrap>
                        <WrapItem w={"250px"} h={'100px'}>
                          <FormControl isInvalid={errors.status}>
                            <FormLabel>Status</FormLabel>
                            <InputGroup>
                              <Switch {...register("status")} size="lg" />
                            </InputGroup>
                            <FormErrorMessage>
                              {errors.status && errors.status.message}
                            </FormErrorMessage>
                          </FormControl>
                        </WrapItem>
                      </Wrap>
                      <Wrap spacing={5}>
                        <WrapItem w={"250px"}>
                          <Button
                            colorScheme="blue"
                            bg="blue.400"
                            color="white"
                            isLoading={isSubmitting}
                            type="submit"
                            w={"full"}
                            _hover={{
                              bg: "blue.500",
                            }}
                          >
                            {textButton}
                          </Button>
                        </WrapItem>
                      </Wrap>
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
