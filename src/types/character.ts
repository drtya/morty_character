export type IParams = {
  page: string;
  status: string;
  gender: string;
  search: string;
}
export interface IFilter {
  id: string;
  name: string;
  value: string;
}

export interface ICharactersPage {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string | '';
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ITransformCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  location: string;
  image: string;
}
export interface ITransformCharactersPage {
  info: {
    count: number;
    pages: number;
  };
  results: ITransformCharacter[];
}
