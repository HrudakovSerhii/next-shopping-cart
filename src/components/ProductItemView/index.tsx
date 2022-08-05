import React from 'react';

import Image from '../Image';

import { CartItem, Product } from '../../types';

type ProductItemProps = Product & {
    addToCart: (cartItem: CartItem) => void,
}

const ProductItemView: React.FC<ProductItemProps> = ({
  brandName,
  categoryName,
  gtin,
  imageUrl,
  name,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
  addToCart,
}) => {
  const onProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const addedItem = {
      gtin,
      name,
      imageUrl,
      recommendedRetailPrice,
      recommendedRetailPriceCurrency,
      quantity: 1,
    };

    addToCart(addedItem);
  };

  return (
    <div className="group relative border-2 rounded-md p-3 flex flex-col">
      <div
        className="image flex justify-center aspect-w-1 h-32 rounded-md group-hover:opacity-75 lg:h-40 lg:aspect-none"
      >
        <Image
          alt={name}
          src={imageUrl}
          className="w-auto h-full object-center object-cover lg:w-auto lg:h-full"
        />
      </div>
      <h3 className="name mt-2 text-sl text-gray-800 line-clamp-3">{name}</h3>
      <div className="content mt-2 flex flex-1 flex-col justify-end">
        {categoryName && (
          <h4 className="category text-sm text-gray-800">
            Category
            <p className="inline-block ml-1 text-gray-500">{categoryName}</p>
          </h4>
        )}
        {brandName && (
          <h4 className="brand text-sm text-gray-800">
            Brand:
            <p className="inline-block ml-1 text-gray-500">{brandName}</p>
          </h4>
        )}
      </div>
      <h4 className="price mt-2 inline-block whitespace-nowrap w-1 text-sl text-right mt-1 text-gray-900 ">
        {recommendedRetailPrice
          ? `${recommendedRetailPriceCurrency} ${recommendedRetailPrice}`
          : 'No Price Available' }
      </h4>
      <button
        type="submit"
        onClick={onProductClick}
        className="mt-2 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItemView;
