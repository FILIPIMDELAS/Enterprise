javascript
function login(){
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if(email === "filipecristovam2020@gmail.com" && senha === "admin"){
        window.location.href = "../HTML/HOME.html";
    } else {
        alert('Usuário ou senha incorretos');
    }
}
