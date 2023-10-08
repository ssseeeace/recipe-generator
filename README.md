# Recipe Finder Application

This is a full-stack application that allows users to search for recipes. The frontend is designed with Vue.js while the backend is built with Express.js. The potential exists to extend this application with further features like user accounts, meal plan management, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ssseeeace/recipe-generator
   ```

2. **Navigate to the project directory**:

   ```bash
   cd recipe-generator
   ```

3. **Install the required packages for both client and server**:
   
   ```bash
   # For server
   cd server
   npm install
   cd ..
   
   # For client
   cd client
   npm install
   ```

4. **Start the backend server**:

   ```bash
   # From the server directory
   node server.js
   ```

5. **Start the frontend**:

   ```bash
   # From the client directory
   npm run serve
   ```

Access the application on your browser by navigating to `http://localhost:8080`.


## Project Structure

### Frontend

- `src/api`: Houses frontend API utilities, such as the method for recipe search.
- `src/components`: Vue components, notably `RecipeItem` and `RecipeSearch`.

### Backend

- **Server**: Backend components with API functionalities, located in the `server` directory.
  - `server.js`: Main Express app initialization and route handling.
  - `api.js`: Handles frontend API calls to search for recipes.
  - `config.js`: Database configuration file for potential integration with PostgreSQL.

## API Endpoints

- **Recipe Routes** (`/recipes`): Supports recipe searches.

## Future Enhancements

- **User Authentication**: Add the ability for users to create accounts and log in.
- **Database Integration**: Introduce PostgreSQL for data storage, which will allow for user data, recipe favorites, and meal plans to be stored.
- **Error Handling**: Bolster error-handling mechanisms for API requests.
- **Meal Plan Features**: Add features to create and manage meal plans.
- **Security**: Transition to HTTPS for more secure frontend-backend communication.

