// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fruit-store-backend-production.up.railway.app/api/", // your FastAPI backend URL
});

export default api;
