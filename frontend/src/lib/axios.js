import axios from "axios";  // Importing axios library for making HTTP requests

// Creating an axios instance with a base URL for the backend API
const api = axios.create({
  baseURL: "http://localhost:5001/api"
});

export default api;