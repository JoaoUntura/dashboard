
import getDadosDonut from '../func/donust.jsx';
import Graph from './components_graficos/Main.jsx';
import getDadosLine from '../func/line.jsx';


export default async function Page() {
   
    const dadosDonut = await getDadosDonut(11)
    const dadosLine = await getDadosLine(11)
    
  return (
    <Graph dadosDonut={dadosDonut} dadosLine={dadosLine} ></Graph>
)

  
}