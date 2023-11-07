const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {

    const session = req.session;

    if(!session.login){
        res.redirect("/login")
    }else{
        const usertag = session.login.usertag;
        const username = session.login.username;
        const avatar = "/img/arquivos/" + session.login.avatar;

    res.render(__dirname + "/../views/user/configuracao", {title: 'Configurações', usertag: usertag, username: username, avatar: avatar})
    }
})

module.exports = router;