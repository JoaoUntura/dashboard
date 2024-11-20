'use client';
import DonutChart from './Donut.jsx';
import LineGraph from './Line.jsx';
import getDadosDonut from '../../func/donust.jsx';
import getDadosLine from '../../func/line.jsx';
import { useState , useEffect} from 'react';


export default function Graph({ dadosDonut:initialDadosDonut, dadosLine:initialDadosLine }) {
    const [dadosDonut, setDadosDonut] = useState(initialDadosDonut)
    const [dadosLine, setDadosLine] = useState(initialDadosLine)
    const [load, setLoad] = useState(false);
    const [mes, setMes] = useState(11)

    const handleChange = (event) => {
       
        const newMes = event.target.value
        setMes(newMes);
        updateDados(newMes);
       
      };

    const updateDados= async (newMes) => {
        setLoad(true);
        let updatedDadosDonut = await getDadosDonut(newMes);
        setDadosDonut(updatedDadosDonut);
        
        let updatedDadosLine = await getDadosLine(newMes);
        setDadosLine(updatedDadosLine);
        setLoad(false);
    }

    const renderTotal = () =>{
        let total = dadosDonut.dados.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        )

        return(

            <h1>{total}</h1>
        )
    }



  return (
      <div className="p-20 flex flex-col ml-44">
          <select id="number" value={mes} onChange={handleChange} className='w-6'>
              <option value="">Selecione um número</option>
              {[...Array(12).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                      {i + 1}
                  </option>
              ))}
          </select>
          <div className='mb-20 flex flex-row w-full h-[500px] justify-start'>
              <div className='flex flex-row w-1/3 py-12 rounded-xlg shadow-lg px-1 justify-center '>
                  {load ? <h1>Loading...</h1> : <DonutChart dadosDonut={dadosDonut}> </DonutChart>}

              </div>
              <div className='flex flex-row w-1/2 rounded-xlg shadow-lg p-5 justify-center items-center'>
                  {load ? <h1>Loading...</h1> : <LineGraph dadosLine={dadosLine} > </LineGraph>}
              </div>

          </div>
          <div className='mb-20 flex flex-row w-full h-[500px] justify-start'>
              <div className='flex flex-row w-1/3 py-12 rounded-xlg h-28 bg-white shadow-lg px-1 justify-center '>
                {load ? <h1>Loading...</h1> : renderTotal()}
              </div>
          </div>

      </div>
    )
}