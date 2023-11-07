    const inptFile = document.querySelector('#uploadImage');
    const pctImage = document.querySelector('#imageSelected');
    
        inptFile.addEventListener('change', function(e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];
            if (file){
                const reader = new FileReader();
    
                reader.addEventListener('load', function(e){
                    const thisReader = e.target;
                    const imgS = document.createElement('img');
                    imgS.src = thisReader.result;
                    imgS.classList.add("picture__img");
                        
                    pctImage.innerHTML = '';
                    
                    pctImage.src = imgS.src;
                })
                reader.readAsDataURL(file);
            }
        });
