import axios from 'axios';

const API_URL = "http://localhost:3001";  // URL of your backend

export const searchRecipes = (query) => {
    return axios.get(`${API_URL}/recipes/search-edamam?query=${query}`);
};
