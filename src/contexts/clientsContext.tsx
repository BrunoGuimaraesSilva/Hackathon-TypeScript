import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  CepResponseType,
  InterClientContext,
  InterProviderProps,
  PerfilResponseType,
} from "./clientsContext.interface";

export const ClientContext = createContext({} as InterClientContext);

export function ClientProvider({ children }: InterProviderProps) {
  const jsonPerfil = [
    { id: 1, descricao: "Admin" },
    { id: 2, descricao: "Cliente" },
  ];

  const router = useRouter();
  const [cep, setCep] = useState<CepResponseType>();
  const [perfil, setPerfil] = useState<Array<PerfilResponseType>>(jsonPerfil);

  //   useEffect(() => {
  //      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
  //        setCep(res.data)
  //      });
  //   }, []);

  async function getCepData(cep: number): Promise<void> {
    try {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res):void => {
        setCep(res.data);
      });
    } catch (error) {}
  }

  return (
    <ClientContext.Provider
      value={{
        cep,
        perfil,
        getCepData,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
