import CharacterList from '@/components/character/character-list';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Персонажи</h2>
      <Suspense>
      <CharacterList />
      </Suspense>
    </div>
  );
}
