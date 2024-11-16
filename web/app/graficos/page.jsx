
import getDadosDonut from '../func/donust.jsx';
import Graph from './components_graficos/Main.jsx';
import getDadosLine from '../func/line.jsx';



export default async function Page() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const {labels,dados,colors} = await getDadosDonut(month)
    const{data_despesa, data_receita}= await getDadosLine(month)
    
  return (
    <Graph labels={labels} dados={dados} colors={colors} data_despesa={data_despesa} data_receita={data_receita}></Graph>
)

  
}