import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.154.111:8000/',
//   timeout: 5000, 
//   headers: {
//     'Content-Type': 'application/json',gtit 
//   },
});

export default api;
