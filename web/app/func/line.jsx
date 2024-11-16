'use server';
import api from './api'

export default async function getDadosLine(mes) {

    try {
        const response = await api.post("/dados_line",{mes});
    
        return {dados_despesa:response.data.data_despesa, dados_receita:response.data.data_receita};
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return [], [],[]
    }
  }
  

