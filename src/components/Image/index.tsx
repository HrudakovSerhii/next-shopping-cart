import React, { useState } from 'react';

type ImageProps = {
    src: string;
    fallbackSrc?: string;
    alt: string;
    className: string
}

const Image: React.FC<ImageProps> = ({
  alt, src, fallbackSrc = '/fallback.png', ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default Image;
