import axios from 'axios';


const api = axios.create({
  baseURL: 'https://91a0-168-227-227-50.ngrok-free.app' 
});

// Exporta a instância para ser usada em outros arquivos
export default api;