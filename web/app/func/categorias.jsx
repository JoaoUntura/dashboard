'use server';
import api from './api'

export default async function getCategorias() {
    try {
        const response = await api.get("/categorias");
        return response.data.categorias
        
        
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return {
            categorias: [],
            
        };
    }
}

