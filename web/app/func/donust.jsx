'use server';
import api from './api'

export default async function getDadosDonut(mes) {

    try {
        const response = await api.get(`/registro/dados_donut/${mes}`);
    
        return response.data;
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
  }
  

