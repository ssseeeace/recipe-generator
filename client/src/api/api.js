import axios from 'axios';
export const searchRecipes = async (query) => {
    try {
        const response = await axios.get('http://localhost:3001/recipes/search-edamam', {
            params: {
                query: query
            }
        });
        return response;
    } catch (error) {
        console.error("API call error:", error);
    }
}
