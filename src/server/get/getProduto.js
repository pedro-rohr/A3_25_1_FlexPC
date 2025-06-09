import api from '../api.js';
const getProduto = (id) => {
  return api.get(`/produtos/${id}`)
    .then(response => {
      console.log('Product data fetched successfully:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
      throw new Error('Failed to fetch product data');
    });
};

export default getProduto;
