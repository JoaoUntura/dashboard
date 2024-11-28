'use client';
import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineGraph = ({dadosLine}) => {
    console.log(dadosLine);

    // Separate the data for Despesa and Receita
    const despesaData = dadosLine.filter(d => d.tipo === "Despesa");
    const receitaData = dadosLine.filter(d => d.tipo === "Receita");

    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [
            {
                label: "Despesa",
                data: despesaData.map(d => ({
                    x: d.x,
                    y: d.y
                })),
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                pointStyle: 'circle',
                pointRadius: 7,
                pointHoverRadius: 15,
            },
            {
                label: "Receita",
                data: receitaData.map(d => ({
                    x: d.x,
                    y: d.y
                })),
                borderColor: 'rgb(0,128,0)',
                backgroundColor: 'rgba(0,128,0, 0.7)',
                pointStyle: 'circle',
                pointRadius: 7,
                pointHoverRadius: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Receita vs Despesa',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const { datasetIndex, dataIndex } = context;
                        
                        // Determine the correct dataset and data point
                        const dataset = datasetIndex === 0 ? despesaData : receitaData;
                        const pointData = dataset[dataIndex];

                        if (pointData) {
                            const type = datasetIndex === 0 ? "Despesa" : "Receita";
                            return `${type}: R$${pointData.y}  Data: ${pointData.x}  Descrição: ${pointData.categorias}`;
                        }

                        return 'Sem informações';
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    stepSize: 1,
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 500,
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default LineGraph;