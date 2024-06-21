function codigoRecSenha(){
    var email = document.getElementById('input_Email').value;
    //var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    
    if(email === ''){
        span_erro_email.style.display = 'block'
        input_Email.style.border = '1px solid red'
    }else{
        async function getAllPosts(){
            var url = "https://localhost:7253/api/Enderecos"
            const response = await fetch(url)
            window.data = await response.json()
            submitMostraSenha()
        }
        
        function submitMostraSenha(){
            window.email = document.getElementById('input_Email').value;
            if(pegarSenha(window.data, window.email) != ''){
                span_erro_email.style.display = 'none'
                input_Email.style.border = 'none'
                sec_Cod.style.display = 'flex'
                document.getElementById("but_submit").innerHTML = 'VERIFICAR CODIGO'
                but_submit.setAttribute("onclick", "verificacod()")
                window.codigo = generateRandomCode(6);
            }else{
                span_erro_email.style.display = 'block'
                input_Email.style.border = '1px solid red'
                document.getElementById("span_erro_email").innerHTML = 'Email Invalido'
            }
        }

        function pegarSenha(array, Email){
            for(let i = 0; i < array.length; i++){
                if(array[i].email == Email){
                    return array[i].id
                }
            }
            return false
        }
       
        getAllPosts()

    }
}

function generateRandomCode(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomCode += charset[randomIndex];
    }
    alert(randomCode)
    return randomCode;
}

function verificacod(){
    var codigoVerificacao = document.getElementById('input_Cod').value;

    if(codigoVerificacao === window.codigo){
        sec_Senha.style.display = 'flex'
        sec_confirmSenha.style.display = 'flex'
        document.getElementById("but_submit").innerHTML = 'ATUALIZAR SENHA'
        but_submit.setAttribute("onclick", "validasenhas()")
    }else{
        alert("Codigo Incorreto!")
    }
}

function validasenhas(){
    var senha = document.getElementById('input_Senha').value;
    var validaSenha = document.getElementById('input_confirmSenha').value;

    if(senha === '' || validaSenha === ''){
        if(senha === ''){
            span_erro_senha.style.display = 'block'
            input_Senha.style.border = '1px solid red'
        }else{
            span_erro_senha.style.display = 'none'
            input_Senha.style.border = 'none'
        }
        
        if(validaSenha === ''){
            span_erro_recSenha.style.display = 'block'
            input_confirmSenha.style.border = '1px solid red'
        }else{
            span_erro_recSenha.style.display = 'none'
            input_confirmSenha.style.border = 'none'
        }
    }else{
        if(senha == validaSenha){
            atualizaSenha()
            span_login.style.display = 'block'
            setTimeout(function(){redirecionaLogin()}, 2000)
        }else{
            alert('As senhas não são iguais')
            span_erro_recSenha.style.display = 'block'
            input_confirmSenha.style.border = '1px solid red'
            document.getElementById('span_erro_recSenha').innerHTML = 'As senhas não são iguais!'
            if(senha === ''){
                span_erro_senha.style.display = 'block'
                input_Senha.style.border = '1px solid red'
            }else{
                span_erro_senha.style.display = 'none'
                input_Senha.style.border = 'none'
            }    
        }
    }
}

async function atualizaSenha(){
    const url = "https://appeft.azurewebsites.net/api/usuario"
    const response = await fetch(url)
    window.data = await response.json()

    const email = document.getElementById('input_Email').value

    function pegarSenha(array, Email){
        for(let i = 0; i <array.length; i++){
            if(array[i].email == Email){
                window.idUnico = array[i].id
                window.nameUnico = array[i].name
            }
        }
        return false
    }
    
    pegarSenha(window.data, email)

    const data = {
        id: window.idUnico,
        name: window.nameUnico,
        email: email,
        senha: document.getElementById('input_Senha').value 
    }

    const options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data) 
    }

    const urlComplete = `https://appeft.azurewebsites.net/api/usuario/${window.idUnico}`

    fetch(urlComplete, options)
    .then(response => {
        if (!response.ok) {
        throw new Error('Falha ao atualizar o recurso');
        } 
    })
    .then(updatedData => {
        console.log('Recurso atualizado com sucesso:', updatedData);
    })
    .catch(error => {
        console.error('Erro ao atualizar o recurso:', error);
    });
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
