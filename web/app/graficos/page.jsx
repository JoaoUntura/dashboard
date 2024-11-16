
import getDadosDonut from '../func/donust.jsx';
import Graph from './components_graficos/Main.jsx';
import getDadosLine from '../func/line.jsx';


export default async function Page() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const dadosDonut = await getDadosDonut(month)
    const dadosLine = await getDadosLine(month)
    
  return (
    <Graph dadosDonut={dadosDonut} dadosLine={dadosLine} ></Graph>
)

  
}