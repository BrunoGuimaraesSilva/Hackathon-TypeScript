import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import {
  InterSearchContext,
  ReponseSearchTypeEng,
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
  defaultReponseSearchFormData,
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
  const [reponseSearchs, setReponseSearchs] = useState<Array<ReponseSearchTypeEng>>();
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

  async function getSearchResponse(id: number): Promise<void> {
    axios
      .get(`${urlApi}/pesquisas/${id}/respostas`, config)
      .then((res): void => {
        const data: Array<ReponseSearchTypeEng> = res.data;
        setReponseSearchs(data);
      })
      .catch(function (error) {
        setReponseSearchs(defaultReponseSearchFormData);
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
        toast({
          title: "Sucesso",
          description: res.data ?? "Sucesso ao criar",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
      .delete(`${urlApi}/pesquisas/${id}`, config)
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
        reponseSearchs,
        getSearchResponse,
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
