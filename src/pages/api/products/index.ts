import type { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../../data/products.json';
import { ErrorResponse, Product, ProductsResponse } from '../../../types';

type GetPage = (page: number, size: number) => Product[];

export const API_PRODUCTS_PATH = '/api/products';

export const PRODUCTS_PER_PAGE = [10, 20, 50, 100];
export const DEFAULT_PAGE_SIZE = PRODUCTS_PER_PAGE[0];

export const getPage: GetPage = (page, size) => {
  if (page < 1) {
    // TODO: ask when this check is required
    return [];
  }

  const startIndex = page * size - size;
  const endIndex = startIndex + size;

  return products.slice(startIndex, endIndex);
};

export const handler = (
  request: NextApiRequest,
  response: NextApiResponse<ProductsResponse | ErrorResponse>,
): void => {
  const { method, query } = request;
  const { status } = response;

  switch (method) {
    case 'GET': {
      const stringifiedPage = Array.isArray(query.page)
        ? query.page.join('')
        : query.page;

      const stringifiedPageSize = Array.isArray(query.pagesize)
        ? query.pagesize.join('')
        : query.pagesize;

      const pageNum = Number(stringifiedPage ?? 1);
      const pageSize = Number(stringifiedPageSize ?? DEFAULT_PAGE_SIZE);

      if (Number.isNaN(pageNum) || pageNum < 1) {
        status(400).send('Bad Request');
      } else {
        status(200).json({
          count: 100,
          page: pageNum,
          results: getPage(pageNum, pageSize),
        });
      }
      break;
    }

    default:
      status(405).send('Method Not Allowed');
      break;
  }
};

export default handler;
