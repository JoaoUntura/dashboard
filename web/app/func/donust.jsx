'use server';
import axios from 'axios';

export default async function getDadosDonut(mes) {

    try {
        const response = await axios.post("http://192.168.3.3:8000/dados_donut",{mes});
    
        return {labels:response.data.labels, dados:response.data.dados, colors:response.data.colors};
        
    } catch (error) {
        console.error("Erro ao buscar transacoes:", error);
        return [], [],[]
    }
  }
  

