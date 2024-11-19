
'use client';
import React, {useState } from 'react';
import Modal from './Modal.jsx'
import clsx from 'clsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import Table from './Table.jsx'
import getTransacoes from '../func/transacoes.jsx';
import api from '../func/api.jsx'

export default function Main({categorias, transacoes:initialTransacoes}) {

    const[isOpenModal, setModal] = useState(false)
    const [registro, setRegistro] = useState({idcategoria:null, date: new Date(), obb:"", valor:""})
    const [tipo, setTipo] = useState(null);


    const [recorrencia, setRecorrencia] = useState({ativo: false, frequencia: "Selecionar"})
    const [transacoes_data, setTransacoes] = useState(initialTransacoes)
    
    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    const handleDateChange = (newDate) => {
        setRegistro(prev => ({...prev, date: newDate}));
      };
    
    const handleNewRegistro = (newTipo) =>{
        openModal();
        setTipo(newTipo)
    }
    

    const finishRegistro = async() => {
        console.log(registro)
        console.log(tipo)
        if (tipo && registro.idcategoria && registro.date && registro.obb && registro.valor){
            const data_formatada = registro.date.toISOString()
            api.post("/relatorio", {tipo:tipo,idcategoria: registro.idcategoria, data: data_formatada, obb: registro.obb, valor: registro.valor})
            closeModal()
            let newTransasoes = await getTransacoes()
            setTransacoes(newTransasoes);

        }else{
            alert("Preencha todos os campos!")
        }
     
    }


    const deleteRegistro = async(idRegistro) => {
        api.post("/delete_registro", {id:idRegistro})
        let newTransasoes = await getTransacoes()
        setTransacoes(newTransasoes);
    }


    const renderCategorias = () => {
        if (tipo){
        const filteredCategorias = categorias.filter(c => c.tipo === tipo);
        return filteredCategorias.map(c => (
            <button key={c.idcategorias} onClick={()=>setRegistro(prev => ({...prev, idcategoria: c.idcategorias}))} className={clsx('text-white bg-stone-800 hover:bg-stone-600 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2',{'outline-none ring-2 ring-red-700':registro.idcategoria === c.idcategorias})} >{c.descricao}</button>))
        }
    
    }

 
  return (
    <div className="p-20 flex flex-col items-center justify-center">
        <Table data={transacoes_data} deleteRegistro={deleteRegistro}></Table>

        <Modal isOpen={isOpenModal} onClose={closeModal}>
              <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-gray-800 mb-8'>Novo Registro</h1>
                <div className='flex flex-row flex-wrap items-center justify-evenly mb-8'>
                    {renderCategorias()}
                </div>
                  <textarea value={registro.obb} onChange={(e) => setRegistro(prev => ({...prev, obb: e.target.value}))} className='mb-8 w-96 h-32 rounded p-2 focus:outline-none placeholder-gray-500 bg-stone-100' placeholder='Observações'></textarea>
                  <Calendar className='mb-8 rounded-lg' onChange={handleDateChange} value={registro.date}></Calendar>
                  <input value={registro.valor} onChange={(e) => setRegistro(prev => ({...prev, valor: e.target.value}))} className='p-2 mb-5 mr-5 border-none focus:outline-none placeholder-gray-500 bg-stone-100' type='number' placeholder='Valor'></input>

                  <input  id='recorrencia' type='checkbox' onChange={() =>setRecorrencia((prev) => ({...prev, ativo: !prev.ativo}))}></input>
                  <label htmlFor="recorrencia">Recorrente</label>

                  {recorrencia.ativo && <select value={recorrencia.frequencia} onChange={(e)=> setRecorrencia((prev) => ({...prev, frequencia:e.target.value}))}>
                        <option value="Semanal">Semanal</option>
                        <option value="Mensal">Mensal</option>
                    </select>}


                  <button onClick={finishRegistro} className='mb-4 rounded-full py-2 px-4 bg-stone-800 hover:bg-stone-600 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' >Concluir</button>
              </div>
                                
        </Modal>
        
        <div className='flex flex-row sticky bottom-0'> 
            <button className='mr-4 h-12 rounded-full py-2 px-4 bg-green-500 hover:bg-green-400 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' onClick={() => handleNewRegistro("Receita")}>Nova Receita</button>
            <button className='mb-4 h-12 rounded-full py-2 px-4 bg-red-600 hover:bg-red-400 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' onClick={() => handleNewRegistro("Despesa")}>Novo Despesa</button>
        </div>
    </div>)

  
}
