import './ContainerContainer.css'
import ContentContainer from '../ContentContainer/ContentContainer'
import { initialItens } from'../HeaderContainer/HeaderContainer';
import { useState } from 'react';
import {
    Chart,
    Colors,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend
  } from 'chart.js'
  
  Chart.register(
    Colors,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend
  );
import { Bar } from 'react-chartjs-2';

// eslint-disable-next-line react/prop-types
function ContainerContainer({ dadosCompartilhados, funcao }){
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Dataset',
            },
        },
    };

    function calcularSomaValores(checklists){
        if (dadosCompartilhados === ''){
            let retorna = initialItens
            retorna = retorna.filter(item => item.checklist === checklists)
            retorna = retorna.reduce((total, item) => total + item.valor, 0);
            return(retorna)
        }else{
            let retorna = dadosCompartilhados
            retorna = retorna.filter(item => item.checklist === checklists)
            retorna = retorna.reduce((total, item) => total + item.valor, 0);
            return(retorna)
        }
    }

    const labels = ['teste', 'kabum', 'lalala', 'podecre', 'tututu']
    const initialData = {
        labels,
        datasets: [
            {
                label: 'Etapas',
                data: [calcularSomaValores('teste'), calcularSomaValores('kabum'), calcularSomaValores('lalala'), calcularSomaValores('podecre'), calcularSomaValores('tututu')],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            },
        ],
    };

    const [data, setData] = useState(initialData);
    
    const updateChartData = () => {
        const newData = {
            labels: ['teste', 'kabum', 'lalala', 'podecre', 'tututu'],
            datasets: [
                {
                label: 'Etapas',
                data: [calcularSomaValores('teste'), calcularSomaValores('kabum'), calcularSomaValores('lalala'), calcularSomaValores('podecre'), calcularSomaValores('tututu')],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 1
                },
            ],
        };
        setData(newData);
    };

    funcao(updateChartData)

    return(
        <div className='ContainerContainer'>
            <div className='Graphics' id='Graphics'>
                <Bar options={options} data={data}/>
            </div>
            <ContentContainer/> 
        </div>
    )
}

export default ContainerContainer