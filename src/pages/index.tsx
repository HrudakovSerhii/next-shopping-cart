import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import ProductItemView from '../components/ProductItemView';

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
      count: productsData.count,
      products: productsData.results,
    },
  };
};

type HomePageProps = {
    count: string,
    products: Product[],
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartSize);

  const addToCartAction = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <Layout cartItemsCount={cartItemsCount}>
      <h1>Products</h1>
      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
        {products.map(product => (
          <ProductItemView key={product.gtin} {...product} addToCart={addToCartAction} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
