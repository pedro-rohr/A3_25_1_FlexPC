import { apiLocal } from "../api";

const getProdutosList =  () => {
  return apiLocal.get('/produtos')
    .then(response => {
      console.log('Products list fetched successfully:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching products list:', error);
      throw new Error('Failed to fetch products list');
    });
};
export default getProdutosList;
