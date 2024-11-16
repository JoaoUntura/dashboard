'use server';
import axios from 'axios';

export default async function getCategorias() {
    try {
        const response = await axios.get("http://192.168.3.3:8000/categorias");
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
