'use server';
import api from './api'

export default async function getDadosBar() {

    try {
        const response = await api.get(`/registro/dados_bar`);
    
        return response.data;
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
  }
  

