import { useState } from 'react';
import FilterHeaderContainer from '../FilterHeaderContainer/FilterHeaderContainer';
import './HeaderContainer.css';

export const initialItens = [
  {
    id: 1,
    casa: '02-01',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'teste',
    valor: 100,
  },
  {
    id: 2,
    casa: '02-01',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'kabum',
    valor: 100,
  },
  {
    id: 3,
    casa: '02-01',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'lalala',
    valor: 100,
  },
  {
    id: 4,
    casa: '02-01',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'podecre',
    valor: 100,
  },
  {
    id: 5,
    casa: '02-01',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'tututu',
    valor: 100,
  },
  {
    id: 6,
    casa: '02-02',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'teste',
    valor: 100,
  },
  {
    id: 7,
    casa: '02-02',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'kabum',
    valor: 100,
  },
  {
    id: 8,
    casa: '02-02',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'lalala',
    valor: 100,
  },
  {
    id: 9,
    casa: '02-02',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'podecre',
    valor: 100,
  },
  {
    id: 10,
    casa: '02-02',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'tututu',
    valor: 100,
  },
  {
    id: 11,
    casa: '02-03',
    servico: 'teste',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'teste',
    valor: 100,
  },
  {
    id: 12,
    casa: '02-03',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'kabum',
    valor: 100,
  },
  {
    id: 13,
    casa: '02-03',
    servico: 'teste',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'lalala',
    valor: 100,
  },
  {
    id: 14,
    casa: '02-03',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'podecre',
    valor: 100,
  },
  {
    id: 15,
    casa: '02-03',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'tututu',
    valor: 100,
  },
  {
    id: 16,
    casa: '02-04',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'teste',
    valor: 100,
  },
  {
    id: 17,
    casa: '02-04',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'kabum',
    valor: 100,
  },
  {
    id: 18,
    casa: '02-04',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'lalala',
    valor: 100,
  },
  {
    id: 19,
    casa: '02-04',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'podecre',
    valor: 100,
  },
  {
    id: 20,
    casa: '02-04',
    servico: 'REBOCO',
    equipes: 'X',
    empresa: 'GBS',
    tipologia: '3QIG',
    checklist: 'tututu',
    valor: 100,
  },
];

// eslint-disable-next-line react/prop-types
export default function HeaderContainer({ setDadosCompartilhados, funcao }) {
  const [filteredItens, setFilteredItens] = useState(initialItens);

  const [filterService, setFilterService] = useState(null);
  const [filterCompany, setFilterCompany] = useState(null);
  const [filterTean, setFilterTean] = useState(null);
  const [filterHouse, setFilterHouse] = useState(null);
  const [filterTipology, setFilterTipology] = useState(null);

  const aplyFilter = () => {
    let filtered = initialItens;

    if (filterService) {
      filtered = filtered.filter((item) => item.servico === filterService);
    }

    if (filterCompany) {
      filtered = filtered.filter((item) => item.empresa === filterCompany);
    }

    if (filterTean) {
      filtered = filtered.filter((item) => item.equipes === filterTean);
    }

    if (filterHouse) {
      filtered = filtered.filter((item) => item.casa === filterHouse);
    }

    if (filterTipology) {
      filtered = filtered.filter((item) => item.tipologia === filterTipology);
    }

    setFilteredItens(filtered);
    setDadosCompartilhados(filtered);
  };

  const handleFiltroServiceChange = (item) => {
    setFilterService(item);
    aplyFilter();
  };

  const handleFiltroCompanyChange = (item) => {
    setFilterCompany(item);
    aplyFilter();
  };

  const handleFiltroTeanChange = (item) => {
    setFilterTean(item);
    aplyFilter();
  };

  const handleFiltroHouseChange = (item) => {
    setFilterHouse(item);
    aplyFilter();
  };

  const handleFiltroTipologyChange = (item) => {
    setFilterTipology(item);
    aplyFilter();
  };

  return (
    <header className='HeaderContainer'>
      <FilterHeaderContainer
        conteudo='SERVIÇOS'
        funcao={handleFiltroServiceChange}
      />
      <FilterHeaderContainer
        conteudo='EMPRESA'
        funcao={handleFiltroCompanyChange}
      />
      <FilterHeaderContainer
        conteudo='EQUIPE'
        funcao={handleFiltroTeanChange}
      />
      <FilterHeaderContainer conteudo='CASA' funcao={handleFiltroHouseChange} />
      <FilterHeaderContainer
        conteudo='TIPOLOGIA'
        funcao={handleFiltroTipologyChange}
      />
      {/* <button onClick={AplicaFiltro}>APLICAR FILTRO</button> */}
    </header>
  );
}
