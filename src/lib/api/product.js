import { API_URL } from '../utils/apiUrl';
import axios from 'axios';

export const getAllProducts = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/products`, { params: params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/products/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
