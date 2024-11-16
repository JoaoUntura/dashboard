'use server';
import api from './api'

export default async function getTransacoes() {
    try {
        const response = await api.get("http://192.168.3.3:8000/transacoes");
    
        return response.data.transacoes
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
}

