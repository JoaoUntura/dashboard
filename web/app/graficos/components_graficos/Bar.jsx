import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarController, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function BarGraph({dadosBar}){
    const dadosReceita = dadosBar.filter(d => d.tipo === "Receita")
    const dadosDespesa = dadosBar.filter(d => d.tipo === "Despesa")

    const data = {
        datasets: [{
            label: 'Receitas',
            data: dadosReceita.map(d => ({x:d.x, y:d.y})),
            backgroundColor: [
                "rgb(0, 115, 0)"
            ],
            borderColor: [
               "rgb(0, 115, 0)"
            ],
            borderWidth: 1
        },{
            label: 'Despesas',
            data: dadosDespesa.map(d => ({x:d.x, y:d.y})),
            backgroundColor: [
                'rgb(255, 0, 0)'
            ],
            borderColor: [
                'rgb(255, 0, 0)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    stepSize: 1,
                }
            },
            y: {
                beginAtZero: true
                
            }
        }
    };

    return <Bar data={data} options={options} />;
}