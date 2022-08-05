import { getPage } from '../index';

jest.mock('../../../../../data/products.json', () =>
  Array.from(Array(21).keys()).map(v => v + 1));

describe('API.products', () => {
  describe('getPage', () => {
    it('Should return 10 products for page number 2 correctly', () => {
      const result = getPage(2, 10);

      expect(result).toStrictEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    it('Should return 1 product for page number 1 correctly', () => {
      const result = getPage(3, 10);

      expect(result).toStrictEqual([21]);
    });

    it('Should return no products for page where number is < 1 correctly', () => {
      const result = getPage(0, 10);

      expect(result).toStrictEqual([]);
    });
  });
});

export {};
