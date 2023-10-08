<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="small-logo">
    <RecipeSearch />
  </div>
</template>

<script>
import RecipeSearch from './components/RecipeSearch.vue';

export default {
  name: 'App',
  components: {
    RecipeSearch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.small-logo {
  width: 100px; /* Adjust the width as needed */
  height: auto; /* Automatically adjust the height to maintain aspect ratio */
}
</style>
