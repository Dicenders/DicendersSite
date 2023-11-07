//switch das cores
var descendentes = document.querySelectorAll("#colorList a");
var dft = "default";
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
}

function setcorview(){
    if (localStorage.getItem('colorbtn')){
        document.getElementById(localStorage.getItem('colorbtn')).classList.add("selected-config");
        document.getElementById(localStorage.getItem('colorbtn')).style.cssText =
        'border: #FFF 5px solid !important;';
        document.getElementById(localStorage.getItem('colorbtn')).innerHTML.add
    } else{
        document.getElementById(corChild).classList.add("selected-config");
        document.getElementById(localStorage.getItem('colorbtn')).style.cssText =
        'border: #FFF 5px solid !important;';
    }
}
lercor();

for (var i = 0; i < descendentes.length; i++) { 

    descendentes[i].addEventListener("click", function (e) {

            if (localStorage.getItem('colorbtn')){
                document.getElementById(localStorage.getItem('colorbtn')).classList.remove("selected-config");
                document.getElementById(localStorage.getItem('colorbtn')).style.cssText =
                'border: #9F2CBF 2px solid !important;';
            } else{
                document.getElementById(corChild).classList.remove("selected-config");
                document.getElementById(corChild).style.cssText =
                'border: #9F2CBF 2px solid !important;';
            }

            cor = this;
            corChild = cor.firstChild;
            selectcor();
            }) 
        }


function selectcor(){
    localStorage.setItem('color', cor.id);
    localStorage.setItem('colorbtn', corChild.id);
    lercor();
}
