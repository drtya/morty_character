'use client';
import { useAppSelector } from '@/store/hooks';
import { ICharacter } from '@/types/character';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SliderEpisode from './sliderEpisode';
import { IResponse } from '@/api/fetchData';
import Loader from '../loader';

const CharacterInfo = () => {
  const [localeChar, setLocalChar] = useState<null | IResponse<ICharacter>>(
    null
  );
  const character = useAppSelector((state) => state.character.currentCharacter);
  const { genderFilter, search, statusFilter } = useAppSelector(
    (state) => state.params
  );
  const generateSearchParam = () => {
    if (genderFilter || search || statusFilter) {
      return `?${genderFilter ? `gender=${genderFilter}` : ''}&${
        search ? `search=${search}` : ''
      }&${statusFilter ? `status=${statusFilter}` : ''}`;
    }
    return '';
  };
  useEffect(() => {
    if (!character?.data) {
      const ch = localStorage.getItem('character');
      setLocalChar(ch ? JSON.parse(ch) : null);
    }
  }, []);
  return (
    <div className="">
      <Link
        href={`/${generateSearchParam()}`}
        className="inline-block px-5 py-2 mb-4 border rounded-md bg-white"
      >
        Back
      </Link>
      <div className="border rounded-2xl overflow-hidden p-4 bg-white shadow-lg">
        {character?.data &&!character.error ? (
          <>
            <Link
              href={character?.data?.url}
              target="_blank"
              className="text-2xl mb-2 font-bold text-gray-700"
            >
              {character?.data?.name}
            </Link>
            <Image
              src={character?.data?.image}
              alt={character?.data?.name}
              width={200}
              height={200}
              className="mx-auto"
            />
            <div className="*:mt-1">
              <div>
                Created date: {format(character?.data?.created, 'dd-MM-yyyy')}
              </div>
              <div>Gender: {character?.data?.gender}</div>
              {character?.data?.type && (
                <div>Type: {character?.data?.type}</div>
              )}
              <div>Species: {character?.data?.species}</div>
              <div>Status: {character?.data?.status}</div>
              <Link
                href={character?.data?.location.url}
                className="block text-gray-400"
                target="_blank"
              >
                Last known location:{character?.data?.location.name}
              </Link>
              <Link
                href={character?.data?.origin.url}
                className="block text-gray-400"
                target="_blank"
              >
                Origin:{character?.data?.origin.name}
              </Link>
              <div>
                <p className="mb-2">Episodes:</p>
                {character?.data?.episode ? (
                  <SliderEpisode episodes={character?.data?.episode} />
                ) : (
                  <div>Episodes is not defined</div>
                )}
              </div>
            </div>
          </>
        ) : localeChar?.data ? (
          <>
            <Link
              href={localeChar?.data?.url}
              target="_blank"
              className="text-2xl mb-2 font-bold text-gray-700"
            >
              {localeChar?.data?.name}
            </Link>
            <Image
              src={localeChar?.data?.image}
              alt={localeChar?.data?.name}
              width={200}
              height={200}
              className="mx-auto"
            />
            <div className="*:mt-1">
              <div>Gender: {localeChar?.data?.gender}</div>
              {localeChar?.data?.type&&<div>Type: {localeChar?.data?.type}</div>}
              <div>Species: {localeChar?.data?.species}</div>
              <div>Status: {localeChar?.data?.status}</div>
              <div>
                Created date: {format(localeChar?.data?.created, 'dd-MM-yyyy')}
              </div>
              <div>
                <Link
                  href={localeChar?.data?.location.url}
                  className="block text-gray-600"
                  target="_blank"
                >
                  Last known location: {localeChar?.data?.location.name}
                </Link>
              </div>
              <div>
                <Link
                  href={localeChar?.data?.origin.url}
                  className="block text-gray-600"
                  target="_blank"
                >
                  Origin: {localeChar?.data?.origin.name}
                </Link>
              </div>
              <div>
                <p className="mb-2">Episodes:</p>
                {localeChar?.data?.episode ? (
                  <SliderEpisode episodes={localeChar?.data?.episode} />
                ) : (
                  <div>Episodes is not defined</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default CharacterInfo;
