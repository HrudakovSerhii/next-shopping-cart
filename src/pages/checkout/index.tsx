import React from 'react';

import Link from 'next/link';

const Checkout: React.FC = () => (
  <div className="container mx-auto px-4">
    <strong>
      Yaay! You got all items for free! But I forgot to ask you your address...
      Lets try one more time! ;)
    </strong>
    <Link href="/">
      <a className="home-link underline">Home</a>
    </Link>
  </div>
);

export default Checkout;
