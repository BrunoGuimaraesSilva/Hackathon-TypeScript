import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  CepResponseType,
  UserTypeEng,
  InterClientContext,
  InterProviderProps,
  PerfilResponseType,
  UserTypePtBr,
} from "./clientsContext.interface";
import { setCookie } from "nookies";
import { useToast } from "@chakra-ui/react";
import { arrayConverterPtBrtoEng, converterEngToPtBr, defaultUserFormData } from "../utils/client";
export const ClientContext = createContext({} as InterClientContext);

export function ClientProvider({ children }: InterProviderProps) {
  const toast = useToast();
  const urlApi: String = "https://pesquisa-satisfacao-api.herokuapp.com/api";
  const router = useRouter();
  const [cep, setCep] = useState<CepResponseType>();
  const [perfil, setPerfil] = useState<Array<PerfilResponseType>>();
  const [users, setUsers] = useState<Array<UserTypeEng>>();
  const [clientToEdit, setClientToEdit ] = useState<UserTypeEng>();


  async function getProfile(): Promise<void> {
    try {
      axios.get(`${urlApi}/perfil`).then((res): void => {
        setPerfil(res.data);
      });
    } catch (error) {}
  }

  async function getCepData(cep: number): Promise<void> {
    try {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res): void => {
        setCep(res.data);
      });
    } catch (error) {}
  }

  async function login(login: string, password: string): Promise<void> {
    axios
      .post(`${urlApi}/login`, {
        email: login,
        senha: password,
      })
      .then((res): void => {
        setCookie(null, "token", res.data, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/dashboard");
      })
      .catch(function (error) {
        toast({
          title: "Erro",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  async function createUser(data: UserTypeEng): Promise<void> {

    const body = converterEngToPtBr(data) 
    axios
      .post(`${urlApi}/clientes`, body)
      .then((res): void => {
        router.push("/dashboard");
      })
      .catch(function (error) {
        toast({
          title: "Erro",
          description: error.response.data ?? "Erro ao Cadastrar",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  async function editUser(data: UserTypeEng): Promise<void> {
    const body = converterEngToPtBr(data) 

    axios
      .put(`${urlApi}/clientes/${data.id}`, body)
      .then((res): void => {
        setClientToEdit(defaultUserFormData)
        router.push("/dashboard");
        toast({
          title: "Sucesso",
          description: res.data ?? "Sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        toast({
          title: "Erro",
          description: error.response.data ?? "Erro ao buscar",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  async function getAllUsers(): Promise<void> {
    axios
      .get(`${urlApi}/clientes`)
      .then((res): void => {
        const data: Array<UserTypePtBr> = res.data;
        setUsers(arrayConverterPtBrtoEng(data));
      })
      .catch(function (error) {
        toast({
          title: "Erro",
          description: error.response.data ?? "Erro ao buscar",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  


  return (
    <ClientContext.Provider
      value={{
        cep,
        perfil,
        users,
        clientToEdit,
        setClientToEdit,
        getCepData,
        getAllUsers,
        login,
        createUser,
        editUser,
        getProfile,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
