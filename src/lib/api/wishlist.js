import { API_URL } from '../utils/apiUrl';
import Cookies from 'js-cookie';
import axios from 'axios';

export const getAllWishlists = async () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/wishlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching wishlists:', error);
    throw error;
  }
};

export const addWishlist = async (params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.post(`${API_URL}/wishlists`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error adding wishlist:', error);
    throw error;
  }
};

export const removeWishlist = async (id) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.delete(`${API_URL}/wishlists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error removing wishlist:', error);
    throw error;
  }
};
