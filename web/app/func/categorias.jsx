'use server';
import api from './api'

export default async function getCategorias() {
    try {
        const response = await api.get("/categorias");
        return response.data
        
        
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return {
            categorias: [],
            
        };
    }
}

