'use server';
import api from './api'

export default async function getCategorias() {
    try {
        const response = await api.get("/categorias");
        return {
            categoria_receita: response.data.categorias_receita,
            categoria_despesa: response.data.categorias_despesa
        };
        
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return {
            categoria_receita: [],
            categoria_despesa: []
        };
    }
}

