import axios from "axios";

const BASE_URL ="https://captioncraft-pqdi.onrender.com/api"; 

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;