'use server';
import axios from 'axios';

export default async function getDadosLine(mes) {

    try {
        const response = await axios.post("http://192.168.3.3:8000/dados_line",{mes});
    
        return {data_despesa:response.data.data_despesa, data_receita:response.data.data_receita};
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return [], [],[]
    }
  }
  

