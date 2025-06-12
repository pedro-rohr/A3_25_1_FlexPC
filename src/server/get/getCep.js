import { apiCep } from '../api';

export const getCepData = async (cep) => {
  try {
    const response = await apiCep.get(`/${cep}`);
    console.log('CEP data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching CEP data:', error);
    throw new Error('Failed to fetch CEP data');
  }
}
