import {
  SearchTypeEng,
  SearchTypePtBr,
} from "../contexts/searchContext.interface";

export function converterSearchEngToPtBr(data: SearchTypeEng): SearchTypePtBr {
  return {
    id: data.id,
    tema_pesquisa: data.searchTheme,
    conteudo: data.body,
    status: data.status ? 0 : 1,
    cliente_id: data.clientId,
    cpf:data.cpf,
    email: data.email,
    nome: data.name,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

export function converterSearchPtBrtoEng(data: SearchTypePtBr): SearchTypeEng {
  return {
    id: data.id,
    searchTheme: data.tema_pesquisa,
    body: data.conteudo,
    status: data.status == 0 ? true : false,
    clientId: data.cliente_id,
    cpf:data.cpf,
    email: data.email,
    name: data.nome,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

export function arrayConverterSearchEngToPtBr(
  data: Array<SearchTypeEng>
): Array<SearchTypePtBr> {
  const newArray: Array<SearchTypePtBr> = [];

  data.forEach((element) => {
    let newData = {
      id: element.id,
      tema_pesquisa: element.searchTheme,
      conteudo: element.body,
      status: element.status ? 0 : 1,
      cliente_id: element.clientId,
      cpf:element.cpf,
      email: element.email,
      nome: element.name,
      created_at: element.created_at,
      updated_at: element.updated_at,
    };
    newArray.push(newData);
  });

  return newArray;
}

export function arrayConverterSearchPtBrtoEng(
  data: Array<SearchTypePtBr>
): Array<SearchTypeEng> {
  const newArray: Array<SearchTypeEng> = [];

  data.forEach((element) => {
    let newData = {
      id: element.id,
      searchTheme: element.tema_pesquisa,
      body: element.conteudo,
      status: element.status == 0 ? true : false,
      cpf:element.cpf,
      email: element.email,
      name: element.nome,
      clientId: element.cliente_id,
      created_at: element.created_at,
      updated_at: element.updated_at,
    };
    newArray.push(newData);
  });

  return newArray;
}

export const defaultSearchFormData: SearchTypeEng = {
  id: undefined,
  searchTheme: "",
  body: "",
  cpf:"",
  email: "",
  name: "",
  status: false,
  clientId: 0,
};
