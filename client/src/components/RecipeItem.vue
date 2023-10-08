<template>
    <div @click="$emit('clicked')" class="recipe-item">
      <h3>{{ recipe.label }}</h3>
      <div v-if="isSelected">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <p><strong>Source:</strong> <a :href="recipe.url" target="_blank">{{ recipe.source }}</a></p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li v-for="ingredient in recipe.ingredientLines" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <!-- You can add more details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: Object,
      isSelected: Boolean
    }
  };
  </script>
  
  <style scoped>
  .recipe-item {
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 18px;
    color: #333;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .recipe-item:hover {
    background-color: #f0f0f0; /* Light gray */
  }
  
  .recipe-item h3 {
    margin: 0;
    color: #444;
    font-size: 20px;
  }
  
  .recipe-image {
    max-width: 100%;
    margin-top: 10px;
    border-radius: 8px;
  }
  
  </style>
  