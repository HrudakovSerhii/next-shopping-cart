import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import ProductItemView from '../components/ProductItemView';
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';

import { fetchData } from '../utils';

import { addToCart, selectCartSize } from './cart/cart.slice';

import { API_PRODUCTS_PATH, PRODUCTS_PER_PAGE, DEFAULT_PAGE_SIZE } from './api/products';

import { CartItem, Product } from '../types';

type ServerSideProps = (
    props: {
      resolvedUrl: string,
      query: { page: string, pagesize: string }
    }) => void;

export const getServerSideProps: ServerSideProps = async ({ resolvedUrl, query }) => {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000' : 'https://qogita.assigment';

  const productsData = await fetchData(`${server}${API_PRODUCTS_PATH}`, resolvedUrl);

  return {
    props: {
      page: query?.page || 1,
      pageSize: query?.pagesize ? Number(query.pagesize) : DEFAULT_PAGE_SIZE,
      productsCount: productsData.count,
      products: productsData.results,
    },
  };
};

type HomePageProps = {
  page: number,
  pageSize: number,
  productsCount: number,
  products: Product[],
}

const HomePage: React.FC<HomePageProps> = ({
  products, page, pageSize, productsCount,
}) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartSize);

  const addToCartAction = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  const dropDownTitle = `${pageSize} Per Page`;
  const dropDownItems = PRODUCTS_PER_PAGE.map(value => {
    const updatedPage = productsCount / value;

    return {
      value,
      label: String(value),
      href: `/?page=${page > updatedPage ? updatedPage : page}&pagesize=${value}`,
    };
  });

  return (
    <Layout cartItemsCount={cartItemsCount}>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start justify-between mt-4">
          <h4 className="text-lg font-medium text-gray-900" id="slide-over-title">Products</h4>
        </div>
        <nav className="navigation flex flex-row justify-between mt-2">
          <Dropdown
            title={dropDownTitle}
            items={dropDownItems}
            selected={page}
          />
          <Pagination pageSize={pageSize} currentPage={page} totalPagesCount={productsCount} />
        </nav>

        <ul className="divide-gray-200 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
          {products.map(product => (
            <ProductItemView key={product.gtin} {...product} addToCart={addToCartAction} />
          ))}
        </ul>

        <nav className="navigation flex flex-row justify-between my-4">
          <Dropdown
            title={dropDownTitle}
            items={dropDownItems}
            selected={page}
          />
          <Pagination pageSize={pageSize} currentPage={page} totalPagesCount={productsCount} />
        </nav>
      </div>
    </Layout>
  );
};

export default HomePage;
