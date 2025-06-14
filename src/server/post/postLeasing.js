import { apiLocal } from "../api";

const postLeasing = async (leasingData) => {
  try {
    const response = await apiLocal.post('/leasing', leasingData);
    console.log('Leasing data posted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting leasing data:', error);
    throw new Error('Failed to post leasing data');
  }
};

export default postLeasing;
