'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

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

  const options = {
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
  };

  return(
    <Doughnut data={data} options={options} />
  )
};

export default DonutChart;