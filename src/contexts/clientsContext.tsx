import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  CepResponseType,
  InterClientContext,
  InterProviderProps,
} from "./clientsContext.interface";

export const ClientContext = createContext({} as InterClientContext);

export function ClientProvider({ children }: InterProviderProps) {
  const router = useRouter();
  const [cep, setCep] = useState<CepResponseType>();

  //   useEffect(() => {

  //   }, []);

  async function getCepData(cep: number) {
    try {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        console.log(res);
      });
    } catch (error) {}
  }

  return (
    <ClientContext.Provider
      value={{
        cep,
        getCepData,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
