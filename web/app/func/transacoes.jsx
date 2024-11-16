'use server';
import axios from 'axios';

export default async function getTransacoes() {
    try {
        const response = await axios.get("http://192.168.3.3:8000/transacoes");
    
        return response.data.transacoes
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
}

