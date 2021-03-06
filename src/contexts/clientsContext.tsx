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
import { parseCookies, setCookie } from "nookies";
import { useToast } from "@chakra-ui/react";
import { arrayConverterPtBrtoEng, converterEngToPtBr, converterPtBrtoEng, defaultUserFormData } from "../utils/client";
export const ClientContext = createContext({} as InterClientContext);

export function ClientProvider({ children }: InterProviderProps) {
  const toast = useToast();
  const urlApi: String = "https://pesquisa-satisfacao-api.herokuapp.com/api";
  const router = useRouter();
  const [cep, setCep] = useState<CepResponseType>();
  const [perfil, setPerfil] = useState<Array<PerfilResponseType>>();
  const [users, setUsers] = useState<Array<UserTypeEng>>();
  const [user, setUser] = useState<UserTypeEng>();
  const [clientToEdit, setClientToEdit ] = useState<UserTypeEng>();
  const cookies = parseCookies();
  const token = cookies.token;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  async function getProfile(): Promise<void> {
    try {
      axios.get(`${urlApi}/perfil`, config).then((res): void => {
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
        setCookie(null, "token", res.data.token, {
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

  async function getAllUsers(): Promise<void> {
    axios
      .get(`${urlApi}/clientes`, config)
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

  async function createUser(data: UserTypeEng): Promise<void> {

    const body = converterEngToPtBr(data) 
    axios
      .post(`${urlApi}/clientes`, body, config)
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
      .put(`${urlApi}/clientes/${data.id}`, body, config)
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

  async function deleteUser(id: number): Promise<void> {
    axios.delete(`${urlApi}/clientes/${id}`, config).then((res): void => {
      getAllUsers()
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
        description: error.response.data ?? "Erro ao apagar",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }

  async function getUserById(id: number): Promise<void> {
    axios
      .get(`${urlApi}/clientes/${id}`, config)
      .then((res):void => {
        const data: UserTypePtBr = res.data;
        const dataConverter = converterPtBrtoEng(data)
        setUser(dataConverter);
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
        user,
        setClientToEdit,
        getCepData,
        getAllUsers,
        getProfile,
        getUserById,
        login,
        createUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
