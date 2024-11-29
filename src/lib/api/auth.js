import { API_URL } from '../utils/apiUrl';
import axios from 'axios';

export const login = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, params);
    return response.data;
  } catch (error) {
    console.error('Login unsuccessful:', error);
    throw error;
  }
};

export const register = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, params);
    return response.data;
  } catch (error) {
    console.error('Register unsuccessful:', error);
    throw error;
  }
};
