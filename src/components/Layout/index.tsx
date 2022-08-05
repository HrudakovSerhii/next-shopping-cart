import React from 'react';

import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  cartItemsCount: number;
};

const Layout = ({ children, cartItemsCount }: Props) => (
  <div className="container mx-auto px-4 max-w-screen-lg justify-center items-center">
    <div className="flex justify-between">
      <strong>Qogita</strong>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="underline">Products</a>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="underline">{`Your Cart (${cartItemsCount})`}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    {children}
  </div>
);

export default Layout;
