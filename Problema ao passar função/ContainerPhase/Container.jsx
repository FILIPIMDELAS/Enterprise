import './Container.css'
import ContainerContainer from '../ContainerContainer/ContainerContainer'
import HeaderContainer from '../HeaderContainer/HeaderContainer'
import { useState } from 'react';

function ContainerPhases(){
    const [dadosCompartilhados, setDadosCompartilhados] = useState('');
    const [funcaoCompartilhada, setFuncaoCompartilhada] = useState('');

    return (
        <div className='Container' id="ContainerPhase">
            <HeaderContainer setDadosCompartilhados={setDadosCompartilhados} funcao={funcaoCompartilhada}/>
            <ContainerContainer dadosCompartilhados={dadosCompartilhados} funcao={setFuncaoCompartilhada}/>
        </div>
    )
}

export default ContainerPhases