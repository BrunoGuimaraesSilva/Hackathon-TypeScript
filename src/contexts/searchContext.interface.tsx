import { ReactNode } from "react";

export interface SearchProviderProps {
  children: ReactNode;
}

export interface InterSearchContext {
  allSearchs?: Array<SearchTypeEng>;
  SearchToEdit?: SearchTypeEng;
  setSearchToEdit(dados: SearchTypeEng):void;
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
  created_at?: string;
  updated_at?: string;
}

export interface SearchTypeWithClientEng {
  id?: number;
  searchTheme: string;
  body: string;
  status: number;
  clientId: number;
  clientName?: string,
  clientCpf?: string,
  created_at?: string;
  updated_at?: string;
}

export interface SearchTypeEng {
  id?: number;
  searchTheme: string;
  body: string;
  status: boolean;
  clientId: number;
  created_at?: string;
  updated_at?: string;
}
