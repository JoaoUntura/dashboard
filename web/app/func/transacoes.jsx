'use server';
import api from './api'

export default async function getTransacoes(lastDate=null,lastId=null) {
    try {
        const response = await api.post("/registro/paginar", {"data":lastDate, "idRegistro":lastId});
    
        return response.data
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return []
    }
}

