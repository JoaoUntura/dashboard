'use client';
import DonutChart from './Donut.jsx';
import LineGraph from './Line.jsx';
import getDadosDonut from '../../func/donust.jsx';
import getDadosLine from '../../func/line.jsx';
import { useState , useEffect} from 'react';


export default function Graph({ labels: initialLabels, dados: initialDados, colors: initialColors, data_despesa:initialDespesa, data_receita:initialReceita }) {
    const [labels, setLabels] = useState(initialLabels)
    const [dados, setDados] = useState(initialDados)
    const [colors, setColors] = useState(initialColors)
    const [data_despesa, setDespesa] = useState(initialDespesa)
    const [data_receita, setReceita] = useState(initialReceita)
    const now = new Date();
    const month = now.getMonth() + 1;
    const [mes, setMes] = useState(month)

    const handleChange = (event) => {
        setMes(event.target.value);
      };

    useEffect(() => {
        const updateDadoss = async () => {
            let updatedDados = await getDadosDonut(mes)
            setLabels(updatedDados.labels)
            setDados(updatedDados.dados)
            setColors(updatedDados.colors)
            
            let updatedDadosLine = await getDadosLine(mes)
            setDespesa(updatedDadosLine.data_despesa)
            setReceita(updatedDadosLine.data_receita)

        }

        updateDadoss();
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
              <DonutChart labels={labels} series={dados} colors={colors}> </DonutChart>
        </div>
        <div className='flex flex-row w-1/2  rounded-xlg shadow-lg p-5 justify-center items-center'>
              <LineGraph data_despesa={data_despesa} data_receita={data_receita}> </LineGraph>
              </div>
          </div>

        
    </div>)

  
}