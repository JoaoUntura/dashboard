'use client';
import DonutChart from './Donut.jsx';
import LineGraph from './Line.jsx';
import BarGraph from './Bar.jsx';
import getDadosDonut from '../../func/donust.jsx';
import getDadosLine from '../../func/line.jsx';
import { useState , useMemo} from 'react';
import clsx from 'clsx';



export default function Graph({ dadosDonut:initialDadosDonut, dadosLine:initialDadosLine,dadosBar }) {
    const [dadosDonut, setDadosDonut] = useState(initialDadosDonut)
    const [dadosLine, setDadosLine] = useState(initialDadosLine)
    const [load, setLoad] = useState(false);
    const [mes, setMes] = useState("")

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
    
        const totalDespesa = useMemo(()=>{
            return dadosLine.filter(d => d.tipo === "Despesa").reduce(
                (accumulator, currentValue) => accumulator + currentValue.y, 0,)
         }, [dadosLine])

        const totalReceita = useMemo(()=>{
            return dadosLine.filter(d => d.tipo === "Receita").reduce(
                (accumulator, currentValue) => accumulator + currentValue.y,0,)

        },[dadosLine])
        

        const resumo = useMemo(()=>{
            return (totalReceita - totalDespesa)
        },[totalDespesa, totalReceita])

        return(
            <div className='flex flex-row justify-evenly w-full mb-8 text-2xl'>
                <div className='flex flex-col justify-center items-center font-MoneyFont'>
                    <h1>Resumo</h1>
                    <h1 className={clsx('font-MoneyFont',{'text-green-600':resumo > 0, 'text-red-600':resumo < 0})}>${resumo}</h1>
                </div>

                <div className='flex flex-col justify-center items-center font-MoneyFont'>
                    <h1>Receita</h1>
                    <h1 className='text-green-600 font-MoneyFont'>${totalReceita}</h1>
                </div>
                
                <div className='flex flex-col justify-center items-center font-MoneyFont'>
                    <h1>Despesa</h1>
                    <h1 className='text-red-600 font-MoneyFont'>${totalDespesa}</h1>
                </div>
                
            </div>
        )
    }



  return (
      <div className="p-20 flex flex-col ml-44">

          <select id="number" value={mes} onChange={handleChange} className='max-w-fit'>
              <option value="">Selecione um Mês</option>
              {[...Array(12).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                      {i + 1}
                  </option>
              ))}
          </select>


          <div className='mb-20 flex flex-row w-full h-[500px] justify-start'>
              <div className='flex flex-col w-1/3 py-12 rounded-xlg shadow-lg px-1 justify-center items-center '>
                  <div className='flex flex-row w-full justify-center items-center mb-5 font-MoneyFont text-opacity-25'>
                      <div className='flex flex-row items-center'>
                          <div className="w-11 h-4 bg-green-700 border-solid border-4 border-green-900 border-opacity-45 mr-2"></div>
                          <div>Receitas</div>
                      </div>

                      <div className='flex flex-row ml-5 items-center'>
                          <div className="w-11 h-4 bg-red-700 border-solid border-4 border-red-900 mr-2 border-opacity-45" ></div>
                          <div>Despesas</div>
                      </div>

                    </div>
                  {load ? <h1>Loading...</h1> : <DonutChart dadosDonut={dadosDonut}> </DonutChart>}

              </div>
              <div className='flex flex-col w-1/2 rounded-xlg shadow-lg p-5 justify-center items-center ml-10'>
                {renderTotal()}
                {load ? <h1>Loading...</h1> : <LineGraph dadosLine={dadosLine} > </LineGraph>}
              </div>

          </div>

          <div className='mb-20 flex flex-row w-full h-[500px] justify-center pr-44'>
            <div className='w-1/2 rounded-xlg shadow-lg p-5 justify-center items-center'>
              <BarGraph dadosBar={dadosBar}></BarGraph>
            </div>

          </div>

      </div>
    )
}