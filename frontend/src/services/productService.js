import axios from 'axios';
import API_ENDPOINTS from '../config/api';

export const productService = {
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductsByCategory: async (categoryId) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    getProductBySlug: async (slug) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${slug}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by slug:', error);
            throw error;
        }
    }
};

export default productService; 