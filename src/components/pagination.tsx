'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Pagination = ({ maxPage }: { maxPage: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();
  const onPageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const generatePages = () => {
    const pages = [];
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-4 py-2 border bg-white text-black"
        >
          1
        </button>
      );
      pages.push(<span key="start-dots">...</span>);
    }

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(maxPage, currentPage + 2);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 border ${
            i === currentPage
              ? 'bg-black/60 text-white'
              : 'bg-white text-black'
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < maxPage - 2) {
      pages.push(<span key="end-dots">...</span>);
      pages.push(
        <button
          key={maxPage}
          onClick={() => onPageChange(maxPage)}
          className="px-4 py-2 border bg-white text-black"
        >
          {maxPage}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border bg-white text-black ${currentPage === 1? 'text-gray-400':''}`}
      >
        <span className='block sm:hidden'>&#9668;</span>
        <span className='hidden sm:block'>Предыдущая</span>
      </button>
      {generatePages()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
        className={`px-4 py-2 border bg-white text-black ${currentPage === maxPage? 'text-gray-400':''}`}
      >
        <span className='hidden sm:block'>Следующая</span>
        <span className='block sm:hidden'>&#9658;</span>
      </button>
    </div>
  );
};

export default Pagination;
