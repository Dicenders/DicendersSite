var opcoes = document.querySelectorAll("#listBtnConfig li");
const conteudo = document.getElementById("conteudoConfig");
const pageTemas = document.getElementById("temasPage");
const pageAcess = document.getElementById("acessibilidadePage");
const pageInfoConta = document.getElementById("infoContaPage");
var clicado = '';
for(var i = 0; i < opcoes.length; i++) {
    opcoes[i].addEventListener("click", function (e){
        clicado = this;
        console.log(clicado)
        mudaconteudo();
        mudalayoutbotao();
    })
}

function mudalayoutbotao(){
    if(document.getElementById(clicado.id).querySelector("i").classList.contains('bi-chevron-down')){
        document.getElementById(clicado.id).querySelector("i").classList.replace('bi-chevron-down', 'bi-chevron-up');
    } else{
        document.getElementById(clicado.id).querySelector("i").classList.replace('bi-chevron-up', 'bi-chevron-down');
    }
    
    if(document.getElementById(clicado.id).querySelector("i").classList.contains('bi-chevron-right')){
        document.getElementById(clicado.id).querySelector("i").classList.replace('bi-chevron-right', 'bi-chevron-left');
        document.getElementById(clicado.id).classList.add('config-active');
    } else{
        document.getElementById(clicado.id).querySelector("i").classList.replace('bi-chevron-left', 'bi-chevron-right');
        document.getElementById(clicado.id).classList.remove('config-active');
    }
    //console.log(clicado)
}

//conteudo.innerHTML = FileReader('../index.html');

function mudaconteudo(){

    switch (clicado.id){
        case 'infoConta':
            if(pageInfoConta.classList.contains('d-none')){
                pageInfoConta.classList.remove('d-none');
                //remover os outros
                pageTemas.classList.add('d-none');
                pageAcess.classList.add('d-none');
            } else{
                pageInfoConta.classList.add('d-none');
            }
            break;
        case 'temas':
            if(pageTemas.classList.contains('d-none')){
                pageTemas.classList.remove('d-none');
                timer();
                //remover os outros
                pageInfoConta.classList.add('d-none');
                pageAcess.classList.add('d-none');
            } else{
                pageTemas.classList.add('d-none');
            }
            break;
        case 'acessibilidade':
            if(pageAcess.classList.contains('d-none')){
                pageAcess.classList.remove('d-none');
                //remover os outros
                pageTemas.classList.add('d-none');
                pageInfoConta.classList.add('d-none');
            } else{
                pageAcess.classList.add('d-none');
            }
            break;
    }
}