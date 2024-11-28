import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080/' 
});

// Exporta a instância para ser usada em outros arquivos
export default api;