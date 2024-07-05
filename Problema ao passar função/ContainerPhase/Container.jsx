import './Container.css';
import ContainerContainer from '../ContainerContainer/ContainerContainer';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import { useState } from 'react';

function ContainerPhases() {
  const [dadosCompartilhados, setDadosCompartilhados] = useState();

  const updateChartData = () => {
    const newData = {
      labels: ['teste', 'kabum', 'lalala', 'podecre', 'tututu'],
      datasets: [
        {
          label: 'Etapas',
          data: [
            calcularSomaValores('teste'),
            calcularSomaValores('kabum'),
            calcularSomaValores('lalala'),
            calcularSomaValores('podecre'),
            calcularSomaValores('tututu'),
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 0.5)',
          borderWidth: 1,
        },
      ],
    };
    setData(newData);
  };

  return (
    <div className='Container' id='ContainerPhase'>
      <HeaderContainer
        setDadosCompartilhados={setDadosCompartilhados}
        funcao={updateChartData()}
      />
      <ContainerContainer
        dadosCompartilhados={dadosCompartilhados}
        funcao={updateChartData()}
      />
    </div>
  );
}

export default ContainerPhases;
