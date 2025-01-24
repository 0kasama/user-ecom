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

export const updateCart = async (params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.put(`${API_URL}/carts`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getShippingCost = async (params) => {
  const { weight, destination_id, origin_id, courier } = params;
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(
      `${API_URL}/}/carts/shipping_costs?weight=${weight}&destination_id=${destination_id}&origin_id=${origin_id}&courier=${courier}`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
