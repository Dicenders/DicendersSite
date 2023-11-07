//switch das cores
var descendentes = document.querySelectorAll("#colorList a");
var dft = "default"
const lightdft = document.getElementById("lightCheck");
var lightmode = false;
var cor = dft;
var corChild = "defaultcolor";

function lercor(){
   document.getElementById("html").setAttribute('colormodel', localStorage.getItem("altocontrasteativo"));
    if(localStorage.getItem('color')){
        document.body.setAttribute('theme-dicender', localStorage.getItem('color'));
    } else{
        document.body.setAttribute('theme-dicender', cor.id);
        document.getElementById('lightModeIcon').classList.add('bi-moon-fill');
    }
    setcorview();
    if(lightdft){
        iconLightMode();
    }
}

function setcorview(){
    if (localStorage.getItem('colorbtn')){
        document.getElementById(localStorage.getItem('colorbtn')).classList.add("selected");
        document.getElementById(localStorage.getItem('colorbtn')).style.cssText =
        'border: #FFF 2px solid;';
    } else{
        document.getElementById(corChild).classList.add("selected");
        document.getElementById(corChild).style.cssText =
        'border: #FFF 2px solid;';
    }
}

function iconLightMode(){
    if(localStorage.getItem('lightmode') == 'false'){
        document.getElementById('lightModeIcon').classList.remove('bi-sun-fill');
        document.getElementById('lightModeIcon').classList.add('bi-moon-fill');
    } else if(localStorage.getItem('lightmode') == 'true'){
        document.getElementById('lightModeIcon').classList.remove('bi-moon-fill');
        document.getElementById('lightModeIcon').classList.add('bi-sun-fill');
    }
}

function defaultclaro(){
    if(lightmode == false){
        lightmode = true
    } else{
        lightmode = false
    }
}
lercor();

for (var i = 0; i < descendentes.length; i++) { 

    descendentes[i].addEventListener("click", function (e) {

            if (localStorage.getItem('colorbtn')){
                document.getElementById(localStorage.getItem('colorbtn')).classList.remove("selected");
                document.getElementById(localStorage.getItem('colorbtn')).style.cssText =
                'border: var(--bs-color-1) 2px solid;';
            } else{
                document.getElementById(corChild).classList.remove("selected");
                document.getElementById(corChild).style.cssText =
                'border: var(--bs-color-1) 2px solid;';
            }

            cor = this;
            corChild = cor.firstChild;
            if(lightdft){
                lightdft.onclick = function(e){
                    defaultclaro();
                }
            }
            if(cor.id == dft && lightmode == false){
                document.getElementById('lightModeIcon').classList.replace('bi-sun-fill', 'bi-moon-fill');
                dft = "default";
                cor.id = "default";
            } else if(cor.id == dft && lightmode == true){
                document.getElementById('lightModeIcon').classList.replace('bi-moon-fill', 'bi-sun-fill');
                dft = "lightdefault";
                cor.id = "lightdefault";
            }
            selectcor();
            }) 
        }


function selectcor(){
    localStorage.setItem('color', cor.id);
    localStorage.setItem('colorbtn', corChild.id);
    localStorage.setItem('lightmode', lightmode)
    lercor();
}

