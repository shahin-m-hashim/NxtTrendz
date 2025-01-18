import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BACKEND_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
