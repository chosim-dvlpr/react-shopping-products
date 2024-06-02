import { Product, ProductResponse } from '../types/fetch';
import { Order } from '../types/sort';

const productSorter = (sortings: string[], productCopy: ProductResponse) => {
  const products = [...productCopy.content];
  sortings.forEach((sorting) => {
    const [name, order] = sorting.split(',') as [keyof Product, Order];
    if (name === 'name' || name === 'imageUrl' || name === 'category') {
      products.sort((a, b) => a[name].localeCompare(b[name]));
    } else {
      products.sort((a, b) => a[name] - b[name]);
    }
    if (order === 'desc') {
      products.reverse();
    }
  });
  const result = Object.assign({}, productCopy);
  result.content = products;
  return result;
};

export default productSorter;
