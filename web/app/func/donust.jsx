'use server';
import api from './api'

export default async function getDadosDonut(mes) {

    try {
        const response = await api.post("/dados_donut",{mes});
    
        return {labels:response.data.labels, dados:response.data.dados, colors:response.data.colors};
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return [], [],[]
    }
  }
  

