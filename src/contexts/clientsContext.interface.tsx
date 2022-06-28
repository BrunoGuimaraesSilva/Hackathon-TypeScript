import { ReactNode } from "react";

export interface InterProviderProps {
  children: ReactNode;
}

export interface InterClientContext {
  cep?: CepResponseType;
  perfil?: Array<PerfilResponseType>;
  users?: Array<UserTypeEng>;
  clientToEdit?: UserTypeEng;
  user?: UserTypeEng;
  setClientToEdit(dados: UserTypeEng):void;
  getCepData(dados: number): Promise<void>;
  getAllUsers(): Promise<void>;
  login(login: string, password: string): Promise<any>;
  createUser(data: UserTypeEng): Promise<void>;
  editUser(data: UserTypeEng): Promise<void>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<void>;
  getProfile(): Promise<void>;
  
}

export interface PerfilResponseType {
  id: number;
  descricao: string;
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
  erro?: string;
}

export interface UserTypeEng {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  cpf: string;
  cep: string;
  city: string;
  state: string;
  address: string;
  neighborhood: string;
  houseNumber: string;
  profile: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserTypePtBr {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone: string;
  cpf: string;
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
  bairro: string;
  numero: string;
  perfils_id: string;
  created_at?: string;
  updated_at?: string;
}
