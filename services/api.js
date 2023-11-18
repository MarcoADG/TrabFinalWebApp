import axios from "axios";

const api = axios.create({
  baseURL: "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos",
});

export default api;
