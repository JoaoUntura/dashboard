'use server';
import api from './api'

export default async function getTransacoes(lastDate=null,lastId=null) {
    try {
        const response = await api.post("/transacoes", {"lastDate":lastDate, "lastId":lastId});
    
        return response.data.transacoes
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
}

