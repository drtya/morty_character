'use client';
import { getCharById } from '@/store/characterSlice';
import { useAppDispatch } from '@/store/hooks';
import { ITransformCharacter } from '@/types/character';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = { character: ITransformCharacter };

const CharacterCard = ({ character }: Props) => {
  const dispatch = useAppDispatch();
  const {replace} =useRouter()
  const selectCharacter = async () => {
    const test = await dispatch(getCharById(character.id));
    localStorage.setItem('character',JSON.stringify(test.payload))
    replace('/character')
  };

  const characterStatus = (character: ITransformCharacter) => {
    switch (character.status.toLocaleLowerCase()) {
      case 'dead':
        return 0;
      case 'alive':
        return 1;
      default:
        return 2;
    }
  };
  return (
    <button
      onClick={selectCharacter}
      className="border flex rounded-2xl overflow-hidden min-h-40 shadow-lg bg-white"
    >
      <div className="w-1/3 h-full flex items-center justify-center relative overflow-hidden">
        <Image
          className={`w-full h-full object-cover ${
            character.status.toLocaleLowerCase() === 'dead' && 'opacity-70'
          }`}
          width={200}
          height={200}
          alt={character.name}
          src={character.image}
        />
        {character.status.toLocaleLowerCase() === 'dead' && (
          <div className="absolute top-0 -left-10 w-full h-6 bg-black -rotate-45"></div>
        )}
      </div>
      <div className="w-2/3 px-3 py-4 text-left">
        <h4 className="text-2xl font-bold leading-none">{character.name}</h4>
        <div className="text-base flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              characterStatus(character) === 0
                ? 'bg-red-600'
                : characterStatus(character) === 1
                ? 'bg-green-600'
                : characterStatus(character) === 2
                ? 'bg-gray-600'
                : ''
            }`}
          ></div>
          <div>{character.status}</div> - <div>{character.species}</div>
        </div>

        <div className="text-base">
          <span className="text-sm text-gray-500">Last known location :</span>
          <div>{character.location}</div>
        </div>
      </div>
    </button>
  );
};

export default CharacterCard;
