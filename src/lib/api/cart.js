import { API_URL } from '../utils/apiUrl';
import Cookies from 'js-cookie';
import axios from 'axios';

export const getCart = async () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
};
