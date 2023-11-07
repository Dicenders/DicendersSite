function abreModal() {
    if(localStorage.getItem('postModal') == 1){
        document.getElementById('publicarBtn').click();
        localStorage.setItem('postModal', 0);
    }
}

const myModal = document.getElementById('exampleModal')
const myInput = document.getElementById('postTextArea')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})


document.getElementById('postTextArea').addEventListener('input', function(){
   
    var altura = this.offsetHeight; // altura do textarea
    var ascroll = this.scrollHeight; // altura do scroll
    
      if(ascroll > altura){
         this.style.height = ascroll+"px";
      }else if(!this.value){
         this.style.height = "auto";
      }
 
 });

const emojiSelectorIcon = document.getElementById('emojiSelectorIcon');
const emojiSelector = document.getElementById('emojiSelector');
const emojiList = document.getElementById('emojiList');
const emojiSearch = document.getElementById('emojiSearch'); 
const eSelectorIconChat = document.getElementById('eSelectorIconChat');
const eSelectorChat = document.getElementById('eSelectorChat');
const eListChat = document.getElementById('eListChat');
const eSearchChat = document.getElementById('eSearchChat');
var chatInput = document.getElementById('msgInput');

emojiSelectorIcon.addEventListener('click', () => {
    emojiSelector.classList.toggle('active');
})

if(eSelectorIconChat){
    eSelectorIconChat.addEventListener('click', () => {
        eSelectorChat.classList.toggle('active');
    })
}


fetch('https://emoji-api.com/emojis?access_key=3913859015bcc387e899ea55eff30c4f3bf72fc6')
    .then(res => res.json())
    .then(data => carregaEmoji(data))
    let li = '';
    let liChat = '';
    function carregaEmoji(data){
        data.forEach(emoji => {
        li = document.createElement('li');
        li.setAttribute('emoji-name', emoji.slug);
        if(eSelectorIconChat){
            liChat = document.createElement('li');
            liChat.setAttribute('emoji-name', emoji.slug);
        }
        //console.log(emoji)
        //var codePointList = emoji.character.split('');
        //codePointList.splice(index, 1);
        //if (codePointList.length > 1){
        //    codePointList.pop();
        //}
        //emoji.character = codePointList;
        li.textContent = emoji.character;
        emojiList.appendChild(li);
        if(eSelectorIconChat){

            liChat.textContent = emoji.character;
            eListChat.appendChild(liChat);
        }
        //console.log(emojiList.appendChild(li))
        li.addEventListener('click', () => {
            myInput.value = myInput.value + emoji.character;
            //testeemoji = emoji.character;
            //testando();
        })

        if(eSelectorIconChat){
            liChat.addEventListener('click', () => {
                myInput.value = myInput.value + emoji.character;
                //testeemoji = emoji.character;
                //testando();
            })
        }
    });
}

/*function testando(){
    //console.log(testeemoji);
    console.log('inputinner' + myInput.innerHTML);
    myInput.innerHTML = myInput.innerHTML + testeemoji;
}*/
//console.log(li)

emojiSearch.addEventListener('keyup', e => {
    let value = e.target.value;
    let emojis = document.querySelectorAll('#emojiList li');
    emojis.forEach(emoji =>{
        if (emoji.getAttribute('emoji-name').toLowerCase().includes(value)){
            emoji.style.display = 'flex';
        } else{
            emoji.style.display = 'none';
        }
    })
})

if(eSearchChat){
    eSearchChat.addEventListener('keyup', e => {
        let value = e.target.value;
        let emojis = document.querySelectorAll('#emojiList li');
        emojis.forEach(emoji =>{
            if (emoji.getAttribute('emoji-name').toLowerCase().includes(value)){
                emoji.style.display = 'flex';
            } else{
                emoji.style.display = 'none';
            }
        })
    })
}
