'use client';
import { getEpisode } from '@/api/episode';
import { IResponse } from '@/api/fetchData';
import { IEpisode } from '@/types/episode';
import { useEffect, useState } from 'react';

type Props = { episodeUrl: string };

const EpisodeCard = ({ episodeUrl }: Props) => {
  const [episode, setEpisode] = useState<IResponse<IEpisode> | null>(null);
  useEffect(() => {
    getEpisode(episodeUrl).then(setEpisode);
  }, []);
  return (
    <div className="border mx-2 min-h-24 p-2">
      <p className="text-sm text-gray-500">{episode?.data?.air_date}</p>
      <p className="text-lg font-bold">{episode?.data?.name}</p>
    </div>
  );
};

export default EpisodeCard;
