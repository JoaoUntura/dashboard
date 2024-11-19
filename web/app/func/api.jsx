import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.3.3:8000' 
});

// Exporta a instância para ser usada em outros arquivos
export default api;