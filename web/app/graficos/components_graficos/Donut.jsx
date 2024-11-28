'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const DonutChart = ({dadosDonut}) => {
  const data = {
    labels: dadosDonut.map(d => d.labels),
    datasets: [{
      label: 'Valor',
      data: dadosDonut.map(d => d.dados),
      backgroundColor: dadosDonut.map(d => d.colors),
      hoverOffset: 4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
      },
    
    }
  };

  return(
    <Doughnut data={data} options={options} />
  )
};

export default DonutChart;