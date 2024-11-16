'use client';
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import { Line  } from "react-chartjs-2";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale,Tooltip, Legend);

const LineGraph = ({dadosLine}) => {

    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,19,30,31],
        datasets: [
          {
            label: "Despesa",
            data: dadosLine.dados_despesa,
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            pointStyle: 'circle',
            pointRadius: 7,
            pointHoverRadius: 15,
            fill:true
          },
          {
            label: "Receita",
            data: dadosLine.dados_receita,
            borderColor: 'rgb(0,128,0)',
            backgroundColor: 'rgba(0,128,0, 0.7)',
            pointStyle: 'circle',
            pointRadius: 7,
            pointHoverRadius: 15,
            fill:true
        
          },
          
        ],
       
      };
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Receita vs Despesa', // Título fixo do gráfico
          },
          tooltip: {
      
            callbacks: {
              label: function (tooltipItem) {
                const datasetIndex = tooltipItem.datasetIndex;
                const pointData = tooltipItem.raw;
    
                const description = pointData.descricao;
                const valor = pointData.y
                const data = pointData.data
    
                if (datasetIndex === 0) {
                  return `Despesa: R$${valor}  Data: ${data}  Descrição: ${description}`;

                } else if (datasetIndex === 1) {
                  return `Receita: R$${valor}  Data: ${data}  Descrição: ${description}`;
                }
                return `Valor: R$ ${description}`;
              }
            },
           
          }
        },
        
        scales: {
          x: {
            // Configuração do eixo X
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1, // Intervalo entre os ticks do eixo X (por dia)
            }
          },
          y: {
            // Configuração do eixo Y
            beginAtZero: true,
            ticks: {
              stepSize: 500, // Intervalo entre os ticks no eixo Y (ajustável)
            }
          }
        }
        
      };

  return(
    <Line data={data} options={options} />
  )
};

export default LineGraph;