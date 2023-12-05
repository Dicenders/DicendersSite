var dnum = document.getElementById("dNum");
var vB = document.getElementById('visualBonus');
var valorBonus = 0;
const bonus = document.getElementById('bonus');
const onus = document.getElementById('onus');
var result = document.getElementById('result');
var soma = document.getElementById('soma');
var dices = document.querySelectorAll("#dices button");

//construindo objetos com valores dos dados
var inner = 1;
var d4 = {
    nome : "d4",
    num : 1,
    valor : 4,
};
var d6 = {
    nome : "d6",
    num : 1,
    valor : 6,
};
var d8 = {
    nome : "d8",
    num : 1,
    valor : 8,
};
var d10 = {
    nome : "d10",
    num : 1,
    valor : 10,
};
var d12 = {
    nome : "d12",
    num : 1,
    valor : 12,
};
var d20 = {
    nome : "d20",
    num : 1,
    valor : 20,
};
var d100 = {
    nome : "d100",
    num : 1,
    valor : 100,
};

//lista que armazena os dados
var listDados = [];

result.innerHTML = "resultado";

//verifica qual botão está sendo clicado
for(var i = 0; i < dices.length; i++){
    dices[i].addEventListener("click", function (e) {
        var confList = [];
        var dado = parseInt(this.value);
        //compara o valor do botão com o valor dos dados
        switch(dado){
            case 4:
                //se o dado já existir, incrementa, se não, adiciona
                if(!listDados.includes(d4)){
                    listDados.push(d4);
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                } else{
                    d4.num += 1;
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                }
                break;
            case 6:
                if(!listDados.includes(d6)){
                    listDados.push(d6);
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                } else{
                    d6.num += 1;
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                }
                break;
            case 8:
                if(!listDados.includes(d8)){
                    listDados.push(d8);
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                } else{
                    d8.num += 1;
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                }
                break;
            case 10:
                if(!listDados.includes(d10)){
                    listDados.push(d10);
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                } else{
                    d10.num += 1;
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                }
                break;
            case 12:
                if(!listDados.includes(d12)){
                    listDados.push(d12);
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                } else{
                    d12.num += 1;
                    for(var i = 0; i < listDados.length; i++){
                        confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                    }
                    dnum.innerText = confList;
                }
                break;
            case 20:
                    if(!listDados.includes(d20)){
                        listDados.push(d20);
                        for(var i = 0; i < listDados.length; i++){
                            confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                        }
                        dnum.innerText = confList;
                    } else{
                        d20.num += 1;
                        for(var i = 0; i < listDados.length; i++){
                            confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                        }
                        dnum.innerText = confList;
                    }
                break;
            case 100:
                    if(!listDados.includes(d100)){
                        listDados.push(d100);
                        for(var i = 0; i < listDados.length; i++){
                            confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                        }
                        dnum.innerText = confList;
                    } else{
                        d100.num += 1;
                        for(var i = 0; i < listDados.length; i++){
                            confList.push(" "+listDados[i]["num"]+listDados[i]["nome"])
                        }
                        dnum.innerText = confList;
                    }
                break;
        }
    })
}

function clearS(){
    listDados = [];
    dnum.innerText = "Clique em um dos valores acima";
    result.innerHTML = "resultado";
    soma.innerHTML = "soma";
    d4.num = 1;
    d6.num = 1;
    d8.num = 1;
    d10.num = 1;
    d12.num = 1;
    d20.num = 1;
    d100.num = 1;
    valorBonus = 0;
    vB.innerText = valorBonus;
}

function som(){
    valorBonus += 1;
    vB.innerText = valorBonus;
}

function sub(){
    valorBonus += -1;
    vB.innerText = valorBonus;
}

function roll(){
        var resultList = [];
        var somaResult = 0;
        //percorre a lista de dados e verifica os valores dos dados
        for(var i = 0; i < listDados.length; i++){
            //percorre os dados e calcula os valores
            for(var j = 0; j < listDados[i]["num"]; j++){
                resultList.push(Math.floor((Math.random() * listDados[i]["valor"]) + 1));
            }
        }
        for(var i = 0; i < resultList.length; i++){
            //soma os valores individuais dos dados
            somaResult += resultList[i];
        }
        //soma o valor bonus
        somaResult += valorBonus;
        //mostra os resultados individuais dos dados
        result.innerText = resultList;
        //mostra o resultado geral
        soma.innerText = somaResult;
}