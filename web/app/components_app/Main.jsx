
'use client';
import React, {useEffect, useState } from 'react';
import Modal from './Modal.jsx'
import 'react-calendar/dist/Calendar.css'; 
import Table from './Table.jsx'
import getTransacoes from '../func/transacoes.jsx';
import api from '../func/api.jsx'
import submitRegistro from '../func/submit_registro.jsx'
import Formulario from './Formulario.jsx'

export default function Main({categorias, transacoes:initialTransacoes}) {

    const[isOpenModal, setModal] = useState(false)
    const [registro, setRegistro] = useState({tipo:null,idcategoria:null, date: new Date(), obb:"", valor:"", recorrencia:false, frequencia:false})
    const [transacoes_data, setTransacoes] = useState(initialTransacoes)
    const [pagination, setPagination] = useState({
        lastDate: initialTransacoes[initialTransacoes.length - 1]?.data || null,
        lastId: initialTransacoes[initialTransacoes.length - 1]?.idRegistro || null,
        maisDados: true
    });


    const closeModal = () => {
        setModal(false);
        clearRegistro();
    }
    const openModal = () => setModal(true)


    const handleNewRegistro = (newTipo) =>{
        openModal();
        setRegistro(prev => ({...prev, tipo:newTipo}))
    }
    

    const finishRegistro = async() => {

        if (registro.tipo && registro.idcategoria && registro.date && registro.obb && registro.valor){
            const data_formatada = registro.date.toISOString()
            await submitRegistro(registro.tipo, registro.idcategoria, data_formatada, registro.obb, registro.valor)
            closeModal();
            let newTransacoes = await getTransacoes();
            setTransacoes(newTransacoes);
            setPagination({lastDate: newTransacoes[newTransacoes.length - 1]?.data || null,
                lastId: newTransacoes[newTransacoes.length - 1]?.idRegistro || null, maisDados:true})

            clearRegistro();
        }else{
            alert("Preencha todos os campos!")
        }
     
    }

    const deleteRegistro = async(idRegistro) => {
        api.post("/delete_registro", {id:idRegistro})
        let newTransacoes = await getTransacoes()
        setTransacoes(newTransacoes);
        setPagination({lastDate: newTransacoes[newTransacoes.length - 1]?.data || null,
            lastId: newTransacoes[newTransacoes.length - 1]?.idRegistro || null})

    }

   
    const LoadMore = async() =>{
        try {
       
            const newTransacoes = await getTransacoes(pagination.lastDate, pagination.lastId);
            
            // Se não houver transações ou retornar menos que o limite, significa que chegamos ao fim
            const isLastPage = !newTransacoes || newTransacoes.length < 10 || newTransacoes.length === 0;
            
    
            setPagination(prev => ({
                lastDate: newTransacoes[newTransacoes.length - 1]?.data || null,
                lastId: newTransacoes[newTransacoes.length - 1]?.idRegistro || null,
                maisDados: !isLastPage 
            }));

            setTransacoes(prev => [...prev, ...newTransacoes]);
        
        } catch (error) {
            console.error("Error loading more transactions:", error);
        }
        
    }
    
    const clearRegistro = () => {
        setRegistro({tipo:null,idcategoria:null, date: new Date(), obb:"", valor:"", recorrencia:false, frequencia:false});
    }


  return (
    <div className="p-20 flex flex-col items-center justify-center">
        <Table data={transacoes_data} deleteRegistro={deleteRegistro}></Table>

        <Modal isOpen={isOpenModal} onClose={closeModal}>
           <Formulario categorias={categorias} registro={registro} setRegistro={setRegistro} finishRegistro={finishRegistro}></Formulario>
                                
        </Modal>
        {pagination.maisDados && <button onClick={() => LoadMore()}>Carregar Mais</button>}
        <div className='flex flex-row sticky bottom-0'> 
            <button className='mr-4 h-12 rounded-full py-2 px-4 bg-green-500 hover:bg-green-400 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' onClick={() => handleNewRegistro("Receita")}>Nova Receita</button>
            <button className='mb-4 h-12 rounded-full py-2 px-4 bg-red-600 hover:bg-red-400 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' onClick={() => handleNewRegistro("Despesa")}>Novo Despesa</button>
        </div>
    </div>)

  
}
