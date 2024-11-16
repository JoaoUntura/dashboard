'use server';
import api from './api'

export default async function getTransacoes() {
    try {
        const response = await api.get("/transacoes");
    
        return response.data.transacoes
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
}

