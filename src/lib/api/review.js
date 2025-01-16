import { API_URL } from '../utils/apiUrl';
import axios from 'axios';

export const getProductAllReviews = async (params) => {
    try {
        const response = await axios.get(`${API_URL}/reviews`, params);
        return response;
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        throw error;
    }
};