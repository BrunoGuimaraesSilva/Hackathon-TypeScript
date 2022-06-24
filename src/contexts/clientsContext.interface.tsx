import { ReactNode } from "react";


export interface InterProviderProps {
  children: ReactNode;
}

export interface InterClientContext {
  cep?: CepResponseType;
  perfil?: Array<PerfilResponseType>;
  getCepData(dados: number): Promise<void>;
}

export interface PerfilResponseType {
  id: number,
  descricao: string
}

export interface CepResponseType {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: string
}