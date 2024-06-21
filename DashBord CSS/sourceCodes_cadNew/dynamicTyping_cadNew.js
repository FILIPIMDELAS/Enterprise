function validacampo(){
    var nome = document.getElementById("input_Nome").value;
    var email= document.getElementById ("input_Email").value;
    var senha = document.getElementById ("input_Senha").value;
    var validaSenha = document.getElementById ("input_confirmSenha").value;
    

    if(nome === ''){
        span_erro_nome.style.display = 'block'
        input_Nome.style.border = '1px solid red'
        window.ifName = true
    }else{
        span_erro_nome.style.display = 'none'
        input_Nome.style.border = 'none'
        window.ifName = false
    }
    //------------------------------------------//
    if(email === ''){
        span_erro_email.style.display = 'block'
        input_Email.style.border = '1px solid red'
        window.ifEmail = true
    }else{
        span_erro_email.style.display = 'none'
        input_Email.style.border = 'none'
        window.ifEmail = false
    }
    //------------------------------------------//
    //------------------------------------------//
    if(validaSenha === ''){
        span_erro_recSenha.style.display = 'block'
        input_confirmSenha.style.border = '1px solid red'
        window.ifConfirmSenha = true
    }else{
        span_erro_recSenha.style.display = 'none'
        input_confirmSenha.style.border = 'none'
        window.ifConfirmSenha = false
    }
    //------------------------------------------//
    if(senha != '' & senha != validaSenha){
        alert('As senhas não são iguais')
        span_erro_recSenha.style.display = 'block'
        input_confirmSenha.style.border = '1px solid red'
        document.getElementById('span_erro_recSenha').innerHTML = 'As senhas não são iguais!'
        window.ifValidaSenha = true
    }else{
        span_erro_senha.style.display = 'none'
        input_Senha.style.border = 'none'
        window.ifValidaSenha = false
    }
     //------------------------------------------//
    if(senha === ''){
        span_erro_senha.style.display = 'block'
        input_Senha.style.border = '1px solid red'
        window.ifSenha = true
    }else{
        span_erro_senha.style.display = 'none'
        input_Senha.style.border = 'none'
        window.ifSenha = false
    }

    if(window.ifName == false & window.ifEmail == false & window.ifConfirmSenha == false & window.ifValidaSenha == false & window.ifSenha == false){
        cadastraCliente()
        span_login.style.display = 'block'
        setTimeout(function(){redirecionaLogin()}, 2000)
        return false
    }
}

function cadastraCliente(){
    
    const cont_id = 1

    const url = "https://appeft.azurewebsites.net/api/usuario"

    const arrayPost = {
        id: cont_id,
        email: document.getElementById('input_Email').value,
        nome: document.getElementById('input_Nome').value,
        senha: document.getElementById('input_Senha').value
    }

    const infoMetodo = {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(arrayPost)
    }

    fetch(url, infoMetodo)
    .then(response => {
        if(!response.ok){
            throw new Error ('Erro ao cadastrar novo cliente!')
        }
        return response.json()
    })
    .then(data =>{
        console.log('Cadastrado realizado com sucesso!')
    })
    .catch(error => {
        console.error('Erro: ', error)
    }) 
}

function mostrasenha1(){
    var mostrasenha = document.getElementById("input_Senha");

    if(mostrasenha.type === 'password'){
        mostrasenha.type = 'text'
        document.getElementById("icone_visib1").innerHTML = 'visibility'
    }else{
        mostrasenha.type = 'password'
        document.getElementById("icone_visib1").innerHTML = 'visibility_off'
    }
}

function mostrasenha2(){
    var mostrasenha = document.getElementById("input_confirmSenha");

    if(mostrasenha.type === 'password'){
        mostrasenha.type = 'text'
        document.getElementById("icone_visib2").innerHTML = 'visibility'
    }else{
        mostrasenha.type = 'password'
        document.getElementById("icone_visib2").innerHTML = 'visibility_off'
    }
}

const redLogin = {
    success: true,
    token: '...',
    redirectTo: '../sourceCodes_Login/sourceCode_Login.html'
}

function redirecionaLogin(){
    window.location.href = redLogin.redirectTo
}


