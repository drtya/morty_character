import { getFetch, IResponse } from './fetchData';
import { IEpisode } from '@/types/episode';

export const getEpisode = async (url: string) => {
  const res:IResponse<IEpisode> = await getFetch(url);
  return res;
};
