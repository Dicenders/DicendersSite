const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios")
const session  = require('../app');
require("../Dao/userDao")

router.get('/', (req,res) => {
    res.render(__dirname + '/../views/user/login', {title: 'Login'});

    
})

router.post('/val', async (req,res) => {

    const session = req.session;
    const usertag = req.body.usertag;
    const senha = req.body.senha;

        
    const result = await Usuario.validate(usertag, senha)

    if(result != null){
        
        // console.log(result);
        
        session.login = {
            email: result.email,
            username: result.username,
            usertag: result.usertag,
            senha: result.senha,
            date: result.date,
            avatar: result.avatar,
            seguidores: result.seguidores,
            seguindo: result.seguindo
        }
        
        session.save((err) => {
            // console.log(err);
        })

        res.redirect("/home")

    }else{
        res.render(__dirname + '/../views/user/login', {title: 'Login', errStatus: '303'});
    }
        
        

    
})

module.exports = router;