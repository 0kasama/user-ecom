import { API_URL } from '../utils/apiUrl';
import Cookies from 'js-cookie';
import axios from 'axios';

export const findAllOrders = async () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const findOrder = async (id) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const createOrder = async (params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.post(`${API_URL}/orders`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed Create Order:', error);
    throw error;
  }
};

export const updateOrder = async (id, params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.put(`${API_URL}/orders/${id}`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed Update Order:', error);
    throw error;
  }
};

export const uploadPayment = async (params) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.post(`${API_URL}/orders/upload`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed Upload Payment Proof:', error);
    throw error;
  }
};
