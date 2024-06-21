var linkEndereco = "https://localhost:7253/api/Enderecos"
var linkChecklist = "https://localhost:7253/api/Checklists"

async function pegaTodosCardsExistentes(){
    const response = await fetch(linkEndereco)
    var data = await response.json()
    return(data)
}

async function pegaTodosItensChecklist(){
    const response = await fetch(linkChecklist)
    var data = await response.json()
    return(data)
}

async function filtraServiço(idquadra, idLote){
    try{
        const data = await pegaTodosItensChecklist()

        const FiltraData = data.filter(item => item.servico == idquadra)

        const ValoresChecklist = []

        FiltraData.forEach(item => {
            if(item.casa === idLote){
                ValoresChecklist.push(item)
            }
        })
        
        return ValoresChecklist
    }catch (error) {
        console.error('Erro ao :', error)
        return []
    }
}

function createDiv(){
    var novoNome = document.getElementById('input_titulo').value
    criaNovoCard(novoNome)
}

async function obterUnicosServicos() {
    try {
        const todosCards = await pegaTodosItensChecklist()

        const colunaUnica = [...new Set(todosCards.map(item => item.servico))]

        return colunaUnica
    } catch (error) {
        console.error('Erro ao obter itens únicos da coluna:', error)
        return []
    }
}

async function obterItensUnicosDaColuna() {
    try {
        const todosCards = await pegaTodosCardsExistentes()

        const colunaUnica = [...new Set(todosCards.map(card => card.quadra))]

        return colunaUnica
    } catch (error) {
        console.error('Erro ao obter itens únicos da coluna:', error)
        return []
    }
}

async function obterItensUnicosDasColunas(idQuadra, servico){
    try{
        const data = await pegaTodosCardsExistentes()
        const datal = await pegaTodosItensChecklist()
        
        const NVazia = data.filter(item => item.quadra !== "" && item.lote !== "")

        var valoresUnicos = []

        NVazia.forEach(item => {
            if (item.quadra === idQuadra){
                valoresUnicos.push(item.lote);
            }
        })

        if (valoresUnicos == ""){
            valoresUnicos = []
        }

        const filtraServico = []

        var recebeUnico = [...new Set(datal.map(card => card.casa))]

        valoresUnicos.map(function(titulo, lalala){
            recebeUnico.map(function(titulo, indice){
                if(valoresUnicos[lalala] == recebeUnico[indice]){
                    filtraServico.push(recebeUnico[indice])
                }
            })
        })

        return filtraServico
    }catch (error) {
        console.error('Erro ao obter itens únicos da coluna:', error)
        return []
    }
}

async function criaPrincipalCard(){
    var data = await obterUnicosServicos()

    data.map (function(titulo, indice){
        const section = document.createElement('section')
        section.classList.add('sectionPrincipalServico')
        section.ondblclick = function selecionaServico(){
            const container = document.getElementById('container')
            while (container.firstChild){
                container.removeChild(container.firstChild)
            }

            criaCard(data[indice])
        }
        section.innerHTML=`
        <h2>${data[indice]}<h2>
        `

        container.appendChild(section)
    })
}

criaPrincipalCard()

function apareceSpan(){
    if(span_titulo.style.display = 'none'){
        span_titulo.style.display = 'block'
        document.getElementById('create').innerHTML = 'CANCEL'
        create.setAttribute("onclick", "apagaSpan()")
        return false
    }
}

function apagaSpan(){
    if(span_titulo.style.display = 'block'){
        span_titulo.style.display = 'none'
        document.getElementById('create').innerHTML = 'CREATE NEW CARD'
        create.setAttribute("onclick", "apareceSpan()")
        return false
    }
}

function gerarCodigo() {
    var comprimento = 8;
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var codigo = '';
    for (var i = 0; i < comprimento; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

async function criaCard(servico){

    var data = await obterItensUnicosDaColuna()

    data.map (function(titulo, indice){
        var novoIdExis = gerarCodigo();
        var section = document.createElement('section')
        section.classList.add('sec_casa')
        section.id = data[indice].replace(/\s+/g, '')
        var id_delete = data[indice].replace(/\s+/g, '')
        section.innerHTML = `
            <header>
                <h5 id="h5${novoIdExis}" ondblclick="editaTitulo('${novoIdExis}')"></h5>
                <i id="icone_deletetitulo${novoIdExis}" class="material-icons icone_delete" onclick="deleta('${id_delete}', ${id_delete})">delete</i>
                <input type="text" placeholder="Novo Titulo do Card" id="titulo_Card${novoIdExis}">
                <i id="iconeaddCard${novoIdExis}" class="material-icons icone_add_New" onclick="trocaTitulo('${novoIdExis}')">add</i>
                </header>
            <div class="div_mestre">
                <div id="e${novoIdExis}"></div>
                <footer>
                    <p onclick="coletatitulosubCard('${novoIdExis}')" ><i id="icone_emai" class="material-icons">add</i>Add a card</p>
                    <i id="icone_more" class="material-icons">more_horiz</i>
                    <input type="text" placeholder="Titulo do SubCard" id="titulo_subCard${novoIdExis}">
                    <i id="iconeaddsubCard${novoIdExis}" class="material-icons ICONEAdiciona" onclick="criaSubCard(e${novoIdExis}, '${novoIdExis}')">add</i>
                </footer>
            </div>
        `
        container.appendChild(section)
    
        document.getElementById(`h5${novoIdExis}`).innerHTML = data[indice].replace(/(.{6})/g, '$1 ')
        var idQuadra = data[indice]
        var h5 = document.getElementById(`h5${novoIdExis}`)
        h5.setAttribute("id", `idAleatorio${novoIdExis}`)
    
        input_titulo.value = ''
        span_titulo.style.display = 'none'
        document.getElementById('create').innerHTML = 'CREATE NEW CARD'
        create.setAttribute("onclick", "apareceSpan()")

        criaSubCardDoBanco(idQuadra, novoIdExis, novoIdExis, id_delete, servico)
    })
}

function criaNovoCard(novoNome){

    var novoIdCria = gerarCodigo();

    var section = document.createElement('section')
    section.classList.add('sec_casa')
    section.id = 'a' + novoIdCria
    section.innerHTML = `
        <header>
            <h5 id="h5${novoIdCria}" ondblclick="editaTitulo('${novoIdCria}')"></h5>
            <i id="icone_deletetitulo${novoIdCria}" class="material-icons icone_delete" onclick="deleta(a${novoIdCria})">delete</i>
            <input type="text" placeholder="Novo Titulo do Card" id="titulo_Card${novoIdCria}">
            <i id="iconeaddCard${novoIdCria}" class="material-icons icone_add_New" onclick="trocaTitulo('${novoIdCria}')">add</i>
        </header>
        <div class="div_mestre">
            <div id="e${novoIdCria}"></div>
            <footer>
                <p onclick="coletatitulosubCard('${novoIdCria}')" ><i id="icone_emai" class="material-icons">add</i>Add a card</p>
                <i id="icone_more" class="material-icons">more_horiz</i>
                <input type="text" placeholder="Titulo do SubCard" id="titulo_subCard${novoIdCria}">
                <i id="iconeaddsubCard${novoIdCria}" class="material-icons  ICONEAdiciona" onclick="criaSubCard(e${novoIdCria}, '${novoIdCria}')">add</i>
            </footer>
        </div>
    `
    container.appendChild(section)

    document.getElementById(`h5${novoIdCria}`).innerHTML = novoNome
    var h5 = document.getElementById(`h5${novoIdCria}`)
    h5.setAttribute("id", `idAleatorio${novoIdCria}`)

    input_titulo.value = ''
    span_titulo.style.display = 'none'
    document.getElementById('create').innerHTML = 'CREATE NEW CARD'
    create.setAttribute("onclick", "apareceSpan()")

    CriaTitulos(novoNome, "")
}

function editaTitulo(idTitulo){
    var iconeAddCard = document.getElementById(`iconeaddCard${idTitulo}`)
    var iconeDeleteTitulo = document.getElementById(`icone_deletetitulo${idTitulo}`)
    var tituloCard = document.getElementById(`titulo_Card${idTitulo}`)

    window.TituloASerAtualizado = document.getElementById(`idAleatorio${idTitulo}`).textContent.replace(/\s+/g, '')

    window.IdTituloCard = idTitulo

    iconeAddCard.style.display = 'flex'
    iconeDeleteTitulo.style.display = 'none'
    tituloCard.style.display = 'flex'

    tituloCard.focus()
}

function trocaTitulo(idTitulo){
    var novoTitulo = document.getElementById(`titulo_Card${idTitulo}`).value
    var idtitulo = document.getElementById(`idAleatorio${idTitulo}`)

    idtitulo.innerHTML = novoTitulo

    var iconeAddCard = document.getElementById(`iconeaddCard${idTitulo}`)
    var iconeDeleteTitulo = document.getElementById(`icone_deletetitulo${idTitulo}`)
    var tituloCard = document.getElementById(`titulo_Card${idTitulo}`)

    iconeAddCard.style.display = 'none'
    iconeDeleteTitulo.style.display = 'flex'
    tituloCard.style.display = 'none'

    atualizaTituloCard(idtitulo)
}

async function CriaTitulos(quadra, lote){

    var nameQuadra = quadra.replace(/\s+/g, '')

    const arrayPost = {
        id: 0,
        quadra: nameQuadra,
        lote: lote
    }

    const infoMetodo = {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(arrayPost)
    }

    fetch(linkEndereco, infoMetodo)
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao cadastrar novo card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso')
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}

function criaSubCard(idPai, idPaiT, id_delete){

    var titulogeral = gerarCodigo()

    var tituloSubCard = document.getElementById(`titulo_subCard${idPaiT}`).value
    var input = document.getElementById(`titulo_subCard${idPaiT}`)
    var diva = document.createElement('div')
    diva.classList.add('div')
    diva.id = titulogeral
    diva.innerHTML = `
    <header>
        <h6 id='h6'></h6>
        <i id="icone_email" class="material-icons icone_delete_subcard" onclick="aciona()">expand_more</i>
    </header>
    <div id="div_recebe_checklist"></div>
    <section>
        <p><i id="icone_emai" class="material-icons">schedule</i>Mar 25</p>
        <p><i id="icone_emai" class="material-icons">check_box</i>4/5</p>
        <img src="./image/close-no-homem-sorrindo-na-natureza_23-2150771075.jpg" alt="">
    </section>
    `
    
    idPai.appendChild(diva)

    document.getElementById('h6').innerHTML = tituloSubCard
    h6.setAttribute("id", "idAleatorio")

    input.style.display = 'none'
    input.value = ""
    var icone = document.getElementById(`iconeaddsubCard${idPaiT}`)
    icone.style.display = 'none'

    pegaQuadra(idPaiT)

    CriaTitulosSubCard(window.novoTitulo, tituloSubCard)
    criachecklist()
}

async function criaSubCardDoBanco(idQuadra, idPais, idPaiT, id_delete, servico){
    
    var idPai = document.getElementById(`e${idPais}`)
    var NovoCard = await obterItensUnicosDasColunas(idQuadra, servico)
    var contador = 0

    NovoCard.map (function(titulo, indice){
        var titulogeral = gerarCodigo()
        var input = document.getElementById(`titulo_subCard${idPaiT}`)
        var diva = document.createElement('div')
        diva.classList.add('div')
        diva.id = titulogeral
        var Lote = NovoCard[indice]
        contador++
        diva.innerHTML = `
        <header>
            <h6 id='h6'></h6>
            <i id="icone_expand_checklist${contador}${idPais}" class="material-icons icone_delete_subcard" onclick="aciona(${contador}, '${idPais}')">expand_more</i>
        </header>
        <div id="div_recebe_checklist${contador}${idPais}" class="div_recebe_checklist"></div>
        <section>
            <p><i id="icone_emai" class="material-icons">schedule</i>Mar 25</p>
            <p><i id="icone_emai" class="material-icons">check_box</i>4/5</p>
            <img src="./image/close-no-homem-sorrindo-na-natureza_23-2150771075.jpg" alt="">
        </section>`

        //deletaS('${id_delete}', ${titulogeral}, '${Lote}'
        
        idPai.appendChild(diva)
    
        document.getElementById('h6').innerHTML = NovoCard[indice]
        h6.setAttribute("id", "idAleatorio")
    
        input.style.display = 'none'
        var icone = document.getElementById(`iconeaddsubCard${idPais}`)
        icone.style.display = 'none'

        var teste = 'div_recebe_checklist'+contador+idPais

        criachecklist(contador, idPais, teste, NovoCard[indice], servico)
   })
}

async function CriaTitulosSubCard(quadra, lote){

    const arrayPost = {
        id: 0,
        quadra: quadra,
        lote: lote
    }

    const infoMetodo = {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(arrayPost)
    }

    fetch(linkEndereco, infoMetodo)
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao cadastrar novo card')
        }
        return response.json()
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso')
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
}

async function deleta(id, ids){

    var data = await pegaTodosCardsExistentes() 

    for(let i = 0; i < data.length; i++){
        if(data[i].quadra == id){
            const ida = data[i].id

            const url = `https://localhost:7253/api/Enderecos/${ida}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Não foi possível excluir o recurso');
                }else{
                    console.log('Exclusão concluida com sucesso!')
                }
            }catch (error) {
                console.error('Ocorreu um erro ao excluir o recurso:', error.message);
            }
        }
    }


    ids.parentNode.removeChild(ids);

}

async function deletaS(id, ids, Lote){

    var data = await pegaTodosCardsExistentes() 

    for(let i = 0; i < data.length; i++){
        if(data[i].quadra == id & data[i].lote == Lote){
            const ida = data[i].id

            const url = `https://localhost:7253/api/Enderecos/${ida}`

            try{
                const response = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Não foi possível excluir o recurso');
                }else{
                    console.log('Exclusão concluida com sucesso!')
                }
            }catch (error) {
                console.error('Ocorreu um erro ao excluir o recurso:', error.message);
            }
        }
    }

    ids.parentNode.removeChild(ids);

}
 
function pegaQuadra(idTitulo){
    window.novoTitulo = document.getElementById(`idAleatorio${idTitulo}`).textContent.replace(/\s+/g, '')
}

async function atualizaTituloCard(idTitulo){
    const response = await fetch(linkEndereco)
    const data = await response.json()

    pegaQuadra(idTitulo)

    function pegarSenha(array, quadra){
        for(let i = 0; i <array.length; i++){
            if(array[i].quadra == quadra){
                window.id = array[i].id
                window.lote = array[i].lote
            }
        }
        return false
    }

    pegarSenha(data, window.TituloASerAtualizado)

    const datal = {
        id: window.id,
        quadra: window.novoTitulo,
        lote: window.lote
    }

    const options ={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datal)
    }

    const urlComplete = `https://localhost:7253/api/Enderecos/${window.id}`

    fetch (urlComplete, options)
    .then(response => {
        if(!response.ok) {
            throw new Error('Falha ao atualizar Titulo')
        }
    })
    .then(updatedData => {
        console.log('Titulo Atualizado com sucesso')
    })
    .catch(error => {
        console.error('Erro ao atualizar o titulo: ', error)
    })
}

function coletatitulosubCard(id){
    var input = document.getElementById(`titulo_subCard${id}`)
    input.style.display = 'block'
    input.focus()
    var icone = document.getElementById(`iconeaddsubCard${id}`)
    icone.style.display = 'block'
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        var input = document.getElementById('titulo_subCard')
        input.style.display = 'none'
        var icone = document.getElementById('iconeaddsubCard')
        icone.style.display = 'none'
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        var iconeAddCard = document.getElementById(`iconeaddCard${window.IdTituloCard}`)
        var iconeDeleteTitulo = document.getElementById(`icone_deletetitulo${window.IdTituloCard}`)
        var tituloCard = document.getElementById(`titulo_Card${window.IdTituloCard}`)

        iconeAddCard.style.display = 'none'
        iconeDeleteTitulo.style.display = 'flex'
        tituloCard.style.display = 'none'
    }
});

function aciona(contador, id){
    var click = document.getElementById(`div_recebe_checklist${contador}${id}`)
    var icone = document.getElementById(`icone_expand_checklist${contador}${id}`)

    if(click.style.display == 'block'){
        click.style.display = 'none'
        icone.innerHTML = 'expand_more'
    }else{
        click.style.display = 'block'
        icone.innerHTML = 'keyboard_arrow_up'
    }            
}

async function criachecklist(contador, idPai, teste, titulosubcard, servico){
    var data = await filtraServiço(servico, titulosubcard)

    if(data == ""){
        var click = document.getElementById(`icone_expand_checklist${contador}${idPai}`)
        click.onclick = function(){
            var icone = document.getElementById(`icone_expand_checklist${contador}${idPai}`)

            if(icone.innerText == 'keyboard_arrow_up'){
                    icone.innerHTML = 'expand_more'
            }else{
                    icone.innerHTML = 'keyboard_arrow_up'
            } 
    
        }
    }

    var contador2 = 0

    data.map (function(titulo, indice){
        contador2++
        var checklist = document.createElement('section')
        checklist.innerHTML= `
            <input type="checkbox" id="input_checkbox${contador2}${contador}${idPai}">
            <label for="input_checkbox${contador2}${contador}${idPai}"  id="label_checkbox${contador2}${contador}${idPai}"></label>
        `
        var id_div = document.getElementById(teste)
        id_div.appendChild(checklist)

        var id_label = document.getElementById(`label_checkbox${contador2}${contador}${idPai}`)
        id_label.innerHTML = data[indice].pacote

        var checkbox = document.getElementById(`input_checkbox${contador2}${contador}${idPai}`)
        var label = document.getElementById(`label_checkbox${contador2}${contador}${idPai}`)

        if(data[indice].status == 'CONCLUIDO'){
            checkbox.checked = 'true'
            label.style.textDecorationLine = 'line-through'
        }
    })
}
