'use client';
import DonutChart from './Donut.jsx';
import LineGraph from './Line.jsx';
import getDadosDonut from '../../func/donust.jsx';
import getDadosLine from '../../func/line.jsx';
import { useState , useEffect} from 'react';


export default function Graph({ dadosDonut:initialDadosDonut, dadosLine:initialDadosLine }) {
    const [dadosDonut, setDadosDonut] = useState(initialDadosDonut)
    const [dadosLine, setDadosLine] = useState(initialDadosLine)

    const now = new Date();
    const month = now.getMonth() + 1;
    const [mes, setMes] = useState(month)

    const handleChange = (event) => {
        setMes(event.target.value);
      };

    useEffect(() => {
        const updateDados= async () => {
            let updatedDadosDonut = await getDadosDonut(mes)
            setDadosDonut(updatedDadosDonut)
            
            let updatedDadosLine = await getDadosLine(mes)
            setDadosLine(updatedDadosLine)
        }

        updateDados();
    }, [mes])


  return (
      <div className="p-20 ml-20 flex flex-col items-center justify-center">
          <select id="number" value={mes} onChange={handleChange}>
              <option value="">Selecione um número</option>
              {[...Array(12).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                      {i + 1}
                  </option>
              ))}
          </select>
          <div className='mb-20 flex flex-row w-full h-[500px] justify-evenly'>
              <div className='flex flex-row w-1/3 py-12 rounded-xlg shadow-lg px-1 justify-center '>
                  <DonutChart dadosDonut={dadosDonut}> </DonutChart>
              </div>
              <div className='flex flex-row w-1/2  rounded-xlg shadow-lg p-5 justify-center items-center'>
                  <LineGraph dadosLine={dadosLine} > </LineGraph>
              </div>
          </div>

      </div>)
}