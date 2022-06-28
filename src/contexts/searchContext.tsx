import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import {
  InterSearchContext,
  SearchProviderProps,
  SearchTypeEng,
  SearchTypePtBr
} from "./searchContext.interface";
import { parseCookies, setCookie } from "nookies";
import { useToast } from "@chakra-ui/react";
import {
  arrayConverterSearchEngToPtBr,
  arrayConverterSearchPtBrtoEng,
  converterSearchEngToPtBr,
  defaultSearchFormData,
} from "./../utils/search";
import { TokenType } from "../utils/client";
import jwt_decode from 'jwt-decode';

export const SearchContext = createContext({} as InterSearchContext);

export function SearchProvider({ children }: SearchProviderProps) {
  const toast = useToast();
  const router = useRouter();
  const cookies = parseCookies();
  const urlApi: String = "https://pesquisa-satisfacao-api.herokuapp.com/api";
  const token = cookies.token;
  const [allSearchs, setAllSearchs] = useState<Array<SearchTypeEng>>();
  const [SearchToEdit, setSearchToEdit] = useState<SearchTypeEng>();
  let tokenDecode:any = {}
  if(token){
    tokenDecode = jwt_decode(token);
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAllSearchs(): Promise<void> {
    axios
      .get(`${urlApi}/pesquisas`, config)
      .then((res): void => {
        const data: Array<SearchTypePtBr> = res.data;
        setAllSearchs(arrayConverterSearchPtBrtoEng(data));
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

  async function createSearch(data: SearchTypeEng): Promise<void> {
    const body = converterSearchEngToPtBr(data);
    axios
      .post(`${urlApi}/clientes/${tokenDecode.client.id}/pesquisas`, body, config)
      .then((res): void => {
        router.push("/dashboard");
      })
      .catch(function (error) {
      });
  }

  async function editSearch(data: SearchTypeEng): Promise<void> {
    const body = converterSearchEngToPtBr(data);

    axios
      .put(`${urlApi}/clientes/${tokenDecode.client.id}/pesquisas/${data.id}`, body, config)
      .then((res): void => {
        setSearchToEdit(defaultSearchFormData);
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

  async function deleteSearch(id: number): Promise<void> {
    axios
      .delete(`${urlApi}/clientes/${id}`, config)
      .then((res): void => {
        getAllSearchs();
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

  return (
    <SearchContext.Provider
      value={{
        allSearchs,
        SearchToEdit,
        setSearchToEdit,
        getAllSearchs,
        createSearch,
        editSearch,
        deleteSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
