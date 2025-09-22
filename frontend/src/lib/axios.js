import axios from "axios";  // Importing axios library for making HTTP requests

// Creating an axios instance with a base URL for the backend API
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL
});

export default api;