window.onload = function() {
    window.history.pushState(null, '', window.location.href);

    history.replaceState(null, document.title, window.location.href);
        window.addEventListener('popstate', function() {
        history.replaceState(null, document.title, window.location.href);
    });
}

function mostrasenha(){
    var mostrasenha = document.getElementById("senha");

    if(mostrasenha.type === 'password'){
        mostrasenha.type = 'text'
        document.getElementById("icone_visib").innerHTML = 'visibility'
    }else{
        mostrasenha.type = 'password'
        document.getElementById("icone_visib").innerHTML = 'visibility_off'
    }
}

function verificaCamposVazios() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
  
    const Email = emailInput.value;
    const Senha = senhaInput.value;
  
    if (Email === '') {
      span_email.style.display = 'block';
      emailInput.style.border = '1px solid red';
      window.returnEmail = true;
    } else {
      span_email.style.display = 'none';
      emailInput.style.border = 'none';
      window.returnEmail = false;
    }
  
    if (Senha === '') {
      span_senha.style.display = 'block';
      senhaInput.style.border = '1px solid red';
      window.returnSenha = true;
    } else {
      span_senha.style.display = 'none';
      senhaInput.style.border = 'none';
      window.returnSenha = false;
    }
  
    if (window.returnEmail == false && window.returnSenha == false) {
      submitMostraSenha();
      return false;
    }
}
  

async function getAllPosts(){
    var url = "https://appeft.azurewebsites.net/api/usuario"
    const response = await fetch(url)
    window.data = await response.json()
}

getAllPosts()

function submitMostraSenha(){
    window.email = document.getElementById('email').value 
    window.input_senha = document.getElementById('senha').value
    if(pegarSenha(window.data, window.email) == window.input_senha){
        span_login.style.display = 'block'
        setTimeout(function(){redirecionaHome()}, 2000)
    }else{
        alert('Usuario ou senha incorretos!')
    }
}

function pegarSenha(array, Email){
    for(let i = 0; i < array.length; i++){
        if(array[i].email == Email){
            return array[i].senha
        }
    }
    return false
}

const redRecSenha = {
    success: true,
    token: '...',
    redirectTo: '../sourceCodes_esqPassword/sourceCode_esqPassword.html'
}

function redirecionaRecSenha(){
    window.location.href = redRecSenha.redirectTo
}

const redCadNew = {
    success: true,
    token: '...',
    redirectTo: '../sourceCodes_cadNew/sourceCod_cadNew.html'
}

function redirecionaCadNew(){
    window.location.href = redCadNew.redirectTo
}

const redHome = {
    success: true,
    token: '...',
    redirectTo: '../sourceCodes_Home/sourceCod_Home.html'
}

function redirecionaHome(){
    window.location.href = redHome.redirectTo
}
