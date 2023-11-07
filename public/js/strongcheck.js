var visivelsenha = false;
function checkstrength(){
	var senha = document.getElementById('reg_password').value;
	var forca = 0;
	/*Imprimir a senha*/
	/*document.getElementById("impSenha").innerHTML = "Senha " + senha;*/
    if(senha.length == 0){
        visivelsenha = false;
    }else{
        visivelsenha = true;
    };

    if((senha.length >= 4) && (senha.length <= 7)){
		forca += 10;
	}else if(senha.length > 7){
		forca += 25;
	};

	if((senha.length >= 5) && (senha.match(/[a-z]+/))){
		forca += 10;
	};

	if((senha.length >= 6) && (senha.match(/[A-Z]+/))){
		forca += 20;
	};

	if((senha.length >= 7) && (senha.match(/[@#$%&;*]/))){
		forca += 25;
	};

	if(senha.match(/([1-9]+)\1{1,}/)){
		forca += -25;
	};

	showstrength(forca);
};

function showstrength(forca){
	/*Imprimir a força da senha*/
	/*document.getElementById("impForcaSenha").innerHTML = "Força: " + forca;*/
    if(visivelsenha == false){
        document.getElementById("progressBar").innerHTML = '';
    }else if(forca < 30 ){
        document.getElementById("progressBar").innerHTML = '';
		document.getElementById("progressBar").innerHTML = '<div class="progress mt-2 w-50 bg-glass" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;"><div class="progress-bar bg-danger text-5 oswald-font fw-400" style="width: 25%">Senha fraca</div></div>';
	}else if((forca >= 30) && (forca < 50)){
        document.getElementById("progressBar").innerHTML = '';
		document.getElementById("progressBar").innerHTML = '<div class="progress mt-2 w-50 bg-glass" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;"><div class="progress-bar bg-warning text-5 oswald-font fw-400" style="width: 50%">Senha média</div></div>';
	}else if((forca >= 50) && (forca < 70)){
        document.getElementById("progressBar").innerHTML = '';
		document.getElementById("progressBar").innerHTML = '<div class="progress mt-2 w-50 bg-glass" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;"><div class="progress-bar bg-info text-5 oswald-font fw-400" style="width: 75%">Senha forte</div></div>';
	}else if((forca >= 70) && (forca < 100)){
        document.getElementById("progressBar").innerHTML = '';
		document.getElementById("progressBar").innerHTML = '<div class="progress mt-2 w-50 bg-glass" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 1rem;"><div class="progress-bar bg-success text-5 oswald-font fw-400" style="width: 100%">Senha muito forte</div></div>';
	};
};