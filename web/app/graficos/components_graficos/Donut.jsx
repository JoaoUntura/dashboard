'use client';
import { Doughnut  } from "react-chartjs-2";

const DonutChart = ({dadosDonut}) => {
  const data = {
    labels: dadosDonut.labels,
    datasets: [{
      label: 'Valor',
      data: dadosDonut.dados,
      backgroundColor: dadosDonut.colors,
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        }
      }
    },
  };
  return(
    <Doughnut data={data} config={config}/>
  )
};

export default DonutChart;