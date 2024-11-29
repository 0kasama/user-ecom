import { API_URL } from '../utils/apiUrl';
import Cookies from 'js-cookie';
import axios from 'axios';

export const findUser = async (id) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.put(`${API_URL}/users`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
