import { ReactNode } from "react";

export interface SearchProviderProps {
  children: ReactNode;
}

export interface InterSearchContext {
  allSearchs?: Array<SearchTypeEng>;
  SearchToEdit?: SearchTypeEng;
  reponseSearchs?:Array<ReponseSearchTypeEng>;
  getSearchResponse(id: number): Promise<void>;
  setSearchToEdit(dados: SearchTypeEng): void;
  getAllSearchs(): Promise<void>;
  createSearch(dados: SearchTypeEng): Promise<void>;
  editSearch(dados: SearchTypeEng): Promise<void>;
  deleteSearch(id: number): Promise<void>;
}

export interface SearchTypePtBr {
  id?: number;
  tema_pesquisa: string;
  conteudo: string;
  status: number;
  cliente_id: number;
  nome: string;
  cpf: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchTypeEng {
  id?: number;
  searchTheme: string;
  body: string;
  status: boolean;
  clientId: number;
  name: string;
  cpf: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReponseSearchTypeEng {
  id?: number;
  resposta: string;
  pesquisa_id: number;
  created_at: string;
  updated_at: string;
  nome: string;
}
