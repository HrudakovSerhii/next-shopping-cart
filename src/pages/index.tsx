import Layout from '../components/Layout';

import { fetchData } from '../utils';

import { API_PRODUCTS_PATH } from './api/products';

import { Product } from '../types';

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

const HomePage: React.FC<HomePageProps> = ({ products }) => (
  <Layout>
    <h1>Products</h1>
  </Layout>
);

export default HomePage;
