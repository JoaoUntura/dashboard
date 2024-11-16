import axios from 'axios';


const api = axios.create({
  baseURL: 'https://ql4zt7gm-8000.brs.devtunnels.ms/' 
});

// Exporta a instância para ser usada em outros arquivos
export default api;