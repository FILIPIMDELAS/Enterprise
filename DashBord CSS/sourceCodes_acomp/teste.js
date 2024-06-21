async function pegaTodosItensChecklist(){
    const response = await fetch(linkChecklist)
    var data = await response.json()
    return(data)
}

async function obterItensUnicosDaColuna() {
    try {
        const todosCards = await pegaTodosItensChecklist()

        const colunaUnica = [...new Set(todosCards.map(item => item.servico))]

        return colunaUnica
    } catch (error) {
        console.error('Erro ao obter itens únicos da coluna:', error)
        return []
    }
}






function criaPrincipalCard(){
    var data = obterItensUnicosDaColuna()

    data.map (function(titulo, indice){
        const section = document.createElement('section')
        section.classList.add('sectionPrincipalServico')
        section.innerHTML=`
        <h2>${data[indice].pacote}<h2>
        `
    })
}