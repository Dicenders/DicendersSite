const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
//senha visivel/invisivel
function viewReg(){
    if(reg_password.type=='text'){
        reg_password.type='password';
        document.getElementById("eye").classList.remove('bi-eye');
        document.getElementById("eye").classList.add('bi-eye-slash');
    } else {
        reg_password.type='text';
        document.getElementById("eye").classList.remove('bi-eye-slash');
        document.getElementById("eye").classList.add('bi-eye');
}
}

function viewConf(){
    if(conf_password.type=='text'){
        conf_password.type='password';
        document.getElementById("confirm_eye").classList.remove('bi-eye');
        document.getElementById("confirm_eye").classList.add('bi-eye-slash');
    } else {
        conf_password.type='text';
        document.getElementById("confirm_eye").classList.remove('bi-eye-slash');
        document.getElementById("confirm_eye").classList.add('bi-eye');
}
}


//login

/*
function lerLocalEmail(){
    return localStorage.getItem('email');
}  

function lerLocalSenha(){
    return localStorage.getItem('senha');
}   

function logar(){
    
    var email = document.getElementById('InputEmail1').value;
    var senha = document.getElementById('InputPassword1').value;

    if(senha === lerLocalSenha() && email === lerLocalEmail()){
        alert('Deu bom filho')
        window.location = "menu.html";
    }
    else{
        alert('Seu email ou senha estão incorretos, tente novamente.')
        document.getElementById('InputEmail1').focus();
    }

}
*/

//verificação de cadastro
function cadastrar(input){
    
    
    var username = document.getElementById('reg_username').value;
    var email = document.getElementById('reg_email').value;
    var regsenha = document.getElementById('reg_password').value;
    var confsenha = document.getElementById('conf_password').value;
    let cbtn = document.getElementById('cardBtn');
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if(!username){

        //alert('O username é obrigatório.');
        document.getElementById('textUser').classList.add("text-danger");
        document.getElementById('textUser').innerHTML = "O username é obrigatório.";
        document.getElementById('textEmail').innerHTML = "";
        document.getElementById('textSenha').innerHTML = "";
        document.getElementById('textConfirmSenha').innerHTML = "";
        document.getElementById('reg_username').focus();
     
    } else if (!input.value.match(validRegex)) {
  
        //alert("Endereço de Email inválido!");
        document.getElementById('textEmail').classList.add("text-danger");
        document.getElementById('textUser').innerHTML = "";
        document.getElementById('textEmail').innerHTML = "Endereço de Email inválido!";
        document.getElementById('textSenha').innerHTML = "";
        document.getElementById('textConfirmSenha').innerHTML = "";
        document.getElementById('reg_email').focus();
        return false;
        
    } else if ((!regsenha || !confsenha)){

        //alert('Coloque uma senha.');
        document.getElementById('textSenha').classList.add("text-danger");
        document.getElementById('textUser').innerHTML = "";
        document.getElementById('textEmail').innerHTML = "";
        document.getElementById('textSenha').innerHTML = "Coloque uma senha.";
        document.getElementById('textConfirmSenha').innerHTML = "";
        document.getElementById('reg_password').focus();

    } else if ((regsenha != confsenha)){

        //alert('As senhas não coincidem, tente novamente.')
        document.getElementById('textConfirmSenha').classList.add("text-danger");
        document.getElementById('textUser').innerHTML = "";
        document.getElementById('textEmail').innerHTML = "";
        document.getElementById('textSenha').innerHTML = "";
        document.getElementById('textConfirmSenha').innerHTML = "As senhas não coincidem, tente novamente.";
        document.getElementById('reg_password').focus();

    } else if (username && input.value.match(validRegex) && (regsenha == confsenha)){
        //alert('Cadastro bem-sucedido.');
        setTimeout(()=>{
            cbtn.innerHTML = '<div style="transition: 0.5;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill trans" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg></div>';
        }, 3000);
        cbtn.innerHTML = '<div class="spinner-grow spinner-grow-sm" role="status"><span class="visually-hidden">Loading...</span></div>';
        setTimeout(()=>{
            window.location.href = 'login.php';
        }, 4000);
        return true;

    }
    
}

function mudaPagina() {
    localStorage.setItem('postModal', 1);
}

var navbar = document.querySelector("nav");
var backtop = document.getElementById("backUpBtn")

function rolar(){
    var rolagem = window.scrollY;
  
    if(rolagem <= 70){
      backtop.style.display = 'none';
      backtop.style.opacity = 0;
    } else{
        backtop.style.display = 'flex';
        backtop.style.opacity = 1;
    }
}

rolar();

window.addEventListener('scroll', () =>{
    rolar();
})