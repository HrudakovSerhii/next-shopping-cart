import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import ProductItemView from '../components/ProductItemView';
import Pagination from '../components/Pagination';

import { fetchData } from '../utils';

import { addToCart, selectCartSize } from './cart/cart.slice';

import { API_PRODUCTS_PATH } from './api/products';

import { CartItem, Product } from '../types';

export const getServerSideProps = async ({ resolvedUrl }: { resolvedUrl: string }) => {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000' : 'https://qogita.assigment';

  const productsData = await fetchData(`${server}${API_PRODUCTS_PATH}`, resolvedUrl);

  return {
    props: {
      page: productsData.page,
      productsCount: productsData.count,
      products: productsData.results,
    },
  };
};

type HomePageProps = {
  page: number,
  productsCount: number,
  products: Product[],
}

const HomePage: React.FC<HomePageProps> = ({ products, page, productsCount }) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartSize);

  const addToCartAction = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <Layout cartItemsCount={cartItemsCount}>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start justify-between mt-4">
          <h4 className="text-lg font-medium text-gray-900" id="slide-over-title">Products</h4>
        </div>
        <Pagination pageSize={10} currentPage={page} totalPagesCount={productsCount} />

        <ul className="divide-gray-200 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
          {products.map(product => (
            <ProductItemView key={product.gtin} {...product} addToCart={addToCartAction} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default HomePage;
