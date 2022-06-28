import { UserTypeEng, UserTypePtBr } from "../contexts";

export function converterEngToPtBr(data: UserTypeEng): UserTypePtBr {
  let array: UserTypePtBr = {
    id: data.id,
    nome: data.name,
    email: data.email,
    telefone: data.phone.replace(/\D/g, ""),
    cpf: data.cpf.replace(/\D/g, ""),
    cep: data.cep.replace(/\D/g, ""),
    cidade: data.city,
    estado: data.state,
    endereco: data.address,
    bairro: data.neighborhood,
    numero: data.houseNumber,
    perfils_id: data.profile,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  if(data.password !== ''){
    array = {
      senha: data.password,
      ...array
    }
  }
  
  return array
}

export function converterPtBrtoEng(data: UserTypePtBr): UserTypeEng {
  return {
    id: data.id,
    name: data.nome,
    email: data.email,
    password: data.senha,
    phone: data.telefone,
    cpf: data.cpf,
    cep: data.cep,
    city: data.cidade,
    state: data.estado,
    address: data.endereco,
    neighborhood: data.bairro,
    houseNumber: data.numero,
    profile: data.perfils_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

export function arrayConverterEngToPtBr(
  data: Array<UserTypeEng>
): Array<UserTypePtBr> {
  const newArray: Array<UserTypePtBr> = [];

  data.forEach((element) => {
    let newData = {
      id: element.id,
      nome: element.name,
      email: element.email,
      senha: element.password,
      telefone: element.phone.replace(/\D/g, ""),
      cpf: element.cpf.replace(/\D/g, ""),
      cep: element.cep.replace(/\D/g, ""),
      cidade: element.city,
      estado: element.state,
      endereco: element.address,
      bairro: element.neighborhood,
      numero: element.houseNumber,
      perfils_id: element.profile,
      created_at: element.created_at,
      updated_at: element.updated_at,
    };
    newArray.push(newData);
  });

  return newArray;
}

export function arrayConverterPtBrtoEng(
  data: Array<UserTypePtBr>
): Array<UserTypeEng> {
  const newArray: Array<UserTypeEng> = [];

  data.forEach((element) => {
    let newData = {
      id: element.id,
      name: element.nome,
      email: element.email,
      password: element.senha,
      phone: element.telefone,
      cpf: element.cpf,
      cep: element.cep,
      city: element.cidade,
      state: element.estado,
      address: element.endereco,
      neighborhood: element.bairro,
      houseNumber: element.numero,
      profile: element.perfils_id,
      created_at: element.created_at,
      updated_at: element.updated_at,
    };
    newArray.push(newData);
  });

  return newArray;
}

export interface TokenType {
  iat: number;
  uid: number;
  exp: number;
  iss: string;
  client: tokenClient;
}

export interface tokenClient {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
  bairro: string;
  numero: string;
  perfils_id: number;
  created_at?: null;
  updated_at?: null;
}

export const defaultUserFormData:UserTypeEng = {
  id: undefined,
  name: "",
  email: "",
  password: "",
  phone: "",
  cpf: "",
  cep: "",
  city: "",
  state: "",
  address: "",
  neighborhood: "",
  houseNumber: "",
  profile: "",
  created_at: undefined,
  updated_at: undefined,
};
