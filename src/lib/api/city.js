import { API_URL } from '../utils/apiUrl';
import Cookies from 'js-cookie';
import axios from 'axios';

export const getProvinces = async () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/cities/provinces`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching province:', error);
    throw error;
  }
};

export const getAllCities = async () => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/cities`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

export const getCityByProvince = async (province_id) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw error;
  }
  try {
    const response = await axios.get(`${API_URL}/cities`, {
      params: { province_id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities by province:', error);
    throw error;
  }
};
