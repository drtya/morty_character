'use client';
import { useAppDispatch } from '@/store/hooks';
import { setGender, setStatus } from '@/store/paramsSlice';
import { IFilter } from '@/types/character';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CustomFilter = ({
  selectedList,
  paramsName,
}: {
  selectedList: IFilter[];
  paramsName: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const handleSelect = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term && term !== 'all') {
      if (paramsName === 'gender') {
        dispatch(setGender(term));
      }
      if (paramsName === 'status') {
        dispatch(setStatus(term));
      }
      params.set(paramsName, term);
    } else {
      if (paramsName === 'gender') {
        dispatch(setGender(''));
      }
      if (paramsName === 'status') {
        dispatch(setStatus(''));
      }
      params.delete(paramsName);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="p-2 rounded-md cursor-pointer"
      name={paramsName}
      onChange={(e: any) => handleSelect(e.target.value)}
      defaultValue={searchParams.get(paramsName)?.toString()}
    >
      <option value={'all'}>
        Все
      </option>
      {selectedList.map((el) => (
        <option key={el.id} value={el.value}>{el.name}</option>
      ))}
    </select>
  );
};

export default CustomFilter;
