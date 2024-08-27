'use client';
import React, { useEffect, useState } from 'react';
import CharacterCard from './character-card';
import Pagination from '../pagination';
import { useAppDispatch } from '@/store/hooks';
import { getAllChar } from '@/store/characterSlice';
import { useSearchParams } from 'next/navigation';
import SearchInput from '../search';
import StatusFilter from '../status-filter';
import { characterGenders, characterStasuses } from '@/api/cahracter';
import { ITransformCharactersPage } from '@/types/character';
import { IResponse } from '@/api/fetchData';

const CharacterList = () => {
  const params = useSearchParams();
  const initialParams = {
    gender: params.get('gender') || '',
    page: params.get('page') || '1',
    status: params.get('status') || '',
    name: params.get('search') || '',
  };

  const generatePayload = (data: any) => {
    let result = ``;
    for (const key in data) {
      if (data[key]) {
        result += `${key}=${data[key]}&`;
      }
    }
    return result;
  };
  const [character, setCharacter] =
    useState<IResponse<ITransformCharactersPage>>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllChar(generatePayload(initialParams))).then(
      ({ payload }: any) => setCharacter(payload)
    );
  }, [params]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 ">
        <SearchInput />
        <StatusFilter selectedList={characterStasuses} paramsName="status" />
        <StatusFilter selectedList={characterGenders} paramsName="gender" />
      </div>
      {character?.data && !character.error ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {character?.data?.results.map((char) => (
              <CharacterCard key={`character_${char.id}`} character={char} />
            ))}
          </div>
          <Pagination maxPage={character?.data?.info.pages!} />
        </>
      ) : character?.error ? (
        <div>Не найдено персонажей по данному запросу</div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default CharacterList;
