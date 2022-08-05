import React from 'react';

import Link from 'next/link';

type Props = {
    pageSize: number;
    currentPage: number;
    totalPagesCount: number;
};

const Pagination = ({ pageSize, currentPage, totalPagesCount }: Props) => {
  const maxPages = totalPagesCount / pageSize;

  // Fix for page numbers
  const pagesList: number[] = Array.from(Array(maxPages).keys()).map(v => v + 1);

  const visiblePagesListView = pagesList.reduce(
    (acc: React.ReactElement[], current, index) => {
      const pageNumber = index + 1;

      if (
        pageNumber === 1
            || pageNumber === maxPages
            || (pageNumber - 1 <= currentPage && pageNumber + 1 >= currentPage)
            || (currentPage === 1 && pageNumber === currentPage + 2)
            || (currentPage === maxPages && pageNumber === currentPage - 2)
      ) {
        return [
          ...acc,
          <li>
            {pageNumber === currentPage ? (
              <span className="py-2 px-3 leading-tight text-gray-500 bg-indigo-100 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {pageNumber}
              </span>
            ) : (
              <Link href={`/?page=${pageNumber}`}>
                <a
                  href={`/?page=${pageNumber}`}
                  className="py-2 px-3 leading-tight text-gray-500 bg-indigo-100 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {pageNumber}
                </a>
              </Link>
            )}
          </li>,
        ];
      }

      return [...acc, <li key={`pagination-${pageNumber}`}>...</li>];
    },
    [],
  );

  return (
    <nav aria-label="page-navigation">
      <ul className="flex justify-end -space-x-px">
        {visiblePagesListView}
      </ul>
    </nav>
  );
};

export default Pagination;
