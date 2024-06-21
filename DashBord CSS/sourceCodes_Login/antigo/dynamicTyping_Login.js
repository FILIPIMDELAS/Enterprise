function validaemail(){
    var email = document.getElementById("email").Value;
    var senha = document.getElementById("senha").value;

    if(email === '' || senha === ''){
        alert("Por favor preencha os campos")
    }else{
        if(email ==='filipecristovam2020@gmail.com' != senha ==='Sandsleshe@1'){
            alert("Nome de usuario ou senha incorretos.")
        }else{
            location = "https://filipimdelas.github.io/teste/sourceCodes_Home/index.html"
            alert("login bem sucedido")
        }
    }
}