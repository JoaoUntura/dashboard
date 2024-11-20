import clsx from 'clsx';
import Calendar from 'react-calendar';


export default function Formulario({categorias, registro, setRegistro, finishRegistro}){
    //const [registro, setRegistro] = useState({tipo:null,idcategoria:null, date: new Date(), obb:"", valor:"", recorrencia:false, frequencia:false})""
    const renderCategorias = () => {
        if (registro.tipo){
        const filteredCategorias = categorias.filter(c => c.tipo === registro.tipo);
        return filteredCategorias.map(c => (
            <button key={c.idcategorias} onClick={() => handleChange(c.idcategorias, "idcategoria")} className={clsx('text-white bg-stone-800 hover:bg-stone-600 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2',{'outline-none ring-2 ring-red-700':registro.idcategoria === c.idcategorias})} >{c.descricao}</button>))
        }
    
    }

    const handleDateChange = (newDate) => {
        setRegistro(prev => ({...prev, date: newDate}));
      };
    
    const handleChange = (newValue, field) => {
        setRegistro(prev => ({...prev, [field]:newValue}))
    }

    
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-gray-800 mb-8'>Novo Registro</h1>
            <div className='flex flex-row flex-wrap items-center justify-evenly mb-8'>
                {renderCategorias()}
            </div>
            <textarea value={registro.obb} onChange={(e) => handleChange(e.target.value, "obb")} className='mb-8 w-96 h-32 rounded p-2 focus:outline-none placeholder-gray-500 bg-stone-100' placeholder='Observações'></textarea>

            <Calendar className='mb-8 rounded-lg' onChange={handleDateChange} value={registro.date}></Calendar>

            <input value={registro.valor} onChange={(e) => handleChange(e.target.value, "valor")} className='p-2 mb-5 mr-5 border-none focus:outline-none placeholder-gray-500 bg-stone-100' type='number' placeholder='Valor'></input>

            <input id='recorrencia' type='checkbox' onChange={() => handleChange(!registro.recorrencia, "recorrencia")}></input>
            <label htmlFor="recorrencia">Recorrente</label>

            {registro.recorrencia && <select value={registro.frequencia} onChange={(e) => handleChange(e.target.value, "frequencia")}>
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
            </select>}


            <button onClick={finishRegistro} className='mb-4 rounded-full py-2 px-4 bg-stone-800 hover:bg-stone-600 text-center text-sm text-white transition-all shadow-md border-solid border-2 border-transparent ' >Concluir</button>
        </div>
    );
}

