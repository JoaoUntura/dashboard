import React, {useEffect,useState } from 'react';
import { motion } from 'framer-motion';

export default function Table({data, deletarRegistro}){
    const [dados_filtrados, setDadosFiltrados] = useState(data)
    const [filtro, setFiltro] = useState("Todos")

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
          opacity: 1,
          x: 0,
          transition: { delay: i * 0.05}, // Animação escalonada
        }),
      };


    useEffect(() => {
        setDadosFiltrados(data);
        console.log(data)
    }, [data]); 


    const headers = [{"name":"Categoria"},{"name": "Observação"}, {"name": "data"},{"name": "valor"},{"name":"tools"}]

    const renderData = () =>(
        
        dados_filtrados.map((d,index) => {
            if (d.tipo === 'Receita'  && filtro !== "Despesa"){
                return <motion.tr
                key={d.idRegistro + "_receita"}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                className="border-y-2"
              >
                <td className="py-3 px-4 pr-8 w-52">{d.categoriaDescricao}</td>
                <td className="py-3 px-4 pr-8 w-52">{d.observacao}</td>
                <td className="py-3 px-4 pr-8 w-36 " >{d.data_formatada}</td>
                <td className="text-green-600 py-3 px-4 pr-8 w-28">+ {d.valor}</td>
                <td className="py-3 px-4 pr-8 w-16"><button onClick={()=>deletarRegistro(d.idRegistro, "Receita")}>X</button></td>
                </motion.tr>
            }else if(d.tipo === "Despesa" && filtro !== "Receita"){
                return <motion.tr
                key={d.idRegistro + "_despesa"}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
                className="border-y-2"
              >
                <td className="py-3 px-4 pr-8 w-52">{d.categoriaDescricao}</td>
                <td className="py-3 px-4 pr-8 w-52"> {d.observacao}</td>
                <td className="py-3 px-4 pr-8 w-36" >{d.data_formatada}</td>
                <td className="text-red-600 py-3 px-4 pr-8  w-28">- {d.valor}</td>
                <td className="py-3 px-4 pr-8 w-16"><button onClick={()=>deletarRegistro(d.idRegistro, "Despesa")}>X</button></td>
            </motion.tr>
            }
        })
    )
    
    
    const pesquisaTabela = (texto) =>{
        
        if (texto){
        let pesquisa = data.filter(t => t.observacao.toLowerCase().includes(texto.toLowerCase()))
        setDadosFiltrados(pesquisa)
        }else{
            setDadosFiltrados(data)
        }
    }


    return(
        <div className="mb-8">
            <input type='text' onChange={(e)=>pesquisaTabela(e.target.value)} placeholder='Pesquisar...'></input>
            <select id="filtro" value={filtro} onChange={(e)=>setFiltro(e.target.value)}>
            <option value="Todos" >Todos</option>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
            
        </select>

            <table className="table-auto ">
                <thead>
                    <tr className="border-y-2">
                        {headers.map(h => (
                            <th className="p-3"key={h.name}>{h.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                    {renderData()}

                </tbody>
            </table>
        </div>
    )

}