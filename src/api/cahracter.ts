import {
  ICharacter,
  ICharactersPage,
  ITransformCharactersPage,
} from '@/types/character';
import { getFetch, IResponse } from './fetchData';



export const characterStasuses=[
  {
    id:'status_1',
    name:'alive',
    value:'alive'
  },
  {
    id:'status_2',
    name:'dead',
    value:'dead'
  },
  {
    id:'status_3',
    name:'unknown',
    value:'unknown'
  },
]
export const characterGenders=[
  {
    id:'gender_1',
    name:'female',
    value:'female'
  },
  {
    id:'gender_2',
    name:'male',
    value:'male'
  },
  {
    id:'gender_3',
    name:'genderless',
    value:'genderless'
  },
  {
    id:'gender_4',
    name:'unknown',
    value:'unknown'
  },
]

const transformCharacter = (res: ICharactersPage): ITransformCharactersPage => {
  return {
    info: {
      count: res.info.count,
      pages: res.info.pages,
    },
    results: res.results.map((el: ICharacter) => {
      return {
        id: el.id,
        name: el.name,
        status: el.status,
        species: el.species,
        location: el.location.name,
        image: el.image,
      };
    }),
  };
};

export const getCharacterInPage = async (params: string) => {
  const res:any =await getFetch(`https://rickandmortyapi.com/api/character?${params}`)
  if (res.data) {
    const transformData:IResponse<ITransformCharactersPage> = {...res,data:transformCharacter(res.data)} 
    return transformData
  }
  return res
};
export const getCharacterById = async (id: number) => {
  const res:IResponse<ICharacter> =await getFetch(`https://rickandmortyapi.com/api/character/${id}`)
  return res
};
