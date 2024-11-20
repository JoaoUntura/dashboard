'use server';
import api from './api'

export default async function submitRegistro(tipo,idcategoria,data,obb,valor) {

    try {
        const response =  await api.post("/relatorio", {tipo:tipo,idcategoria: idcategoria, data: data, obb: obb, valor: valor})
    
        return response.data;
        
    } catch (error) {
        
        return console.error("Erro ao dar submit no Registro:", error);
    }
  }
  

