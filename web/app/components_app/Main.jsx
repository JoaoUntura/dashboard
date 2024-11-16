
'use client';
import React, {useState } from 'react';
import Modal from './Modal.jsx'
import clsx from 'clsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios';
import Table from './Table.jsx'
import getTransacoes from '../func/transacoes.jsx';
import { data } from 'motion/react-client';


export default function Main({categoria_receita, categoria_despesa, transacoes:initialTransacoes}) {

    const[isOpenModal, setModal] = useState(false)
    const[idcategoria, setCategoria] = useState([])
    const [date, setDate] = useState(new Date());
    const [obb, setObb] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState(null);
    const [recorrencia, setRecorrencia] = useState({ativo: false, frequencia: "Selecionar"})


    const [transacoes_data, setTransacoes] = useState(initialTransacoes)
    
    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    const handleDateChange = (newDate) => {
        setDate(newDate);
      };
    
    const handleNewRegistro = (newTipo) =>{
        openModal();
        setTipo(newTipo)
    }
    

    const finishRegistro = async() => {
        if (tipo && idcategoria && data && obb && valor){
            const data_formatada = date.toISOString()
            axios.post("http://192.168.3.3:8000/relatorio", {tipo:tipo,idcategoria: idcategoria, data: data_formatada, obb, valor})
            closeModal()
            let newTransasoes = await getTransacoes()
            setTransacoes(newTransasoes);

        }else{
            alert("Preencha todos os campos!")
        }
     
    }


    const deleteRegistro = async(idRegistro, tipoRegistro) => {
        axios.post("http://192.168.3.3:8000/delete_registro", {id:idRegistro, tipo:tipoRegistro})
        let newTransasoes = await getTransacoes()
        setTransacoes(newTransasoes);
    }


    const renderCategorias = () => {
        if (tipo === "Receita"){
            return categoria_receita.map(c => (
                <button key={c.idcategorias} onClick={()=>setCategoria(c.idcategorias)} className={clsx('text-white bg-stone-800 hover:bg-stone-600 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2',{'outline-none ring-2 ring-red-700':idcategoria === c.idcategorias})} >{c.descricao}</button>
            ))
        }else{
            return categoria_despesa.map(c => (
                <button key={c.idcategorias} onClick={()=>setCategoria(c.idcategorias)} className={clsx('text-white bg-stone-800 hover:bg-stone-600 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2',{'outline-none ring-2 ring-red-700':idcategoria === c.idcategorias})}>{c.descricao}</button>
            ))  
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
                  <textarea value={obb} onChange={(e) => setObb(e.target.value)} className='mb-8 w-96 h-32 rounded p-2 focus:outline-none placeholder-gray-500 bg-stone-100' placeholder='Observações'></textarea>
                  <Calendar className='mb-8 rounded-lg' onChange={handleDateChange} value={date}></Calendar>
                  <input value={valor} onChange={(e)=>setValor(e.target.value)} className='p-2 mb-5 mr-5 border-none focus:outline-none placeholder-gray-500 bg-stone-100' type='number' placeholder='Valor'></input>

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
