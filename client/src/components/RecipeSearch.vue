<template>
  <div class="recipe-search">
    <h2 class="search-title">Search for Recipes</h2>
    <p>Tip: You can search for multiple foods separated with a comma.</p>
    
    <div class="search-container">
      <input v-model="query" class="search-input" placeholder="Enter recipe name...">
      <button @click="search" class="search-button">Search</button>
    </div>
    <div class="recipe-list">
    <RecipeItem 
      v-for="recipeObj in recipes" 
      :recipe="recipeObj.recipe" 
      :key="recipeObj.recipe.uri" 
      :isSelected="selectedRecipe === recipeObj.recipe.uri"
      @clicked="selectedRecipe = selectedRecipe === recipeObj.recipe.uri ? null : recipeObj.recipe.uri"
    />
    <p v-if="searched && !recipes.length" class="error-message">No recipes found for your search.</p>
  </div>
  </div>
</template>

<script>
import RecipeItem from './RecipeItem.vue';
import { searchRecipes } from '../api/api'; 

export default {
    components: {
        RecipeItem  // Registering the RecipeItem component
    },
    data() {
        return {
            query: '',
            recipes: [],
            selectedRecipe: null,
            searched: false
        };
    },
    methods: {
        async search() {
            this.searched = true;
            try {
                const response = await searchRecipes(this.query);
                console.log("Received data:", response.data); 
                this.recipes = response.data;
            } catch (error) {
                console.error("Error searching recipes:", error);
            }
        }
    }
};
</script>

<style scoped>
.recipe-search {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.recipe-list {
  list-style: none;
  padding: 0;
}

.recipe-item {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  color: #333;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
