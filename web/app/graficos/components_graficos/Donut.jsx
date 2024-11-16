'use client';

import Chart from 'chart.js/auto';
import { Doughnut  } from "react-chartjs-2";

const DonutChart = ({labels, series,colors}) => {
  const data = {
    labels: labels,
    datasets: [{
      label: 'Valor',
      data: series,
      backgroundColor: colors,
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