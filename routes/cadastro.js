const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
require("../models/Post");
const Usuario = mongoose.model("usuarios")
const Post = mongoose.model("posts")
const session  = require('../app');
const fs = require("fs")
const fileupload = require("express-fileupload")
var uniqid = require('uniqid'); 


router.get('/', (req,res) => {
    res.render(__dirname + '/../views/user/cadastro', {title: 'Cadastro'})
})

router.get('/identidade', (req, res) => {
    
    const session = req.session;

    if(!session.cadastro){
        res.redirect("/cadastro")
    }
    
    res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade'});
    
})

router.post('/new', (req,res) => {
    
    const session = req.session;
    const email = req.body.email;
    const regsenha = req.body.reg_password;
    const confsenha = req.body.conf_password;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
  
        res.render(__dirname + '/../views/user/cadastro', {title: 'Cadastro', errStatus: 303})
    }
    else if ((!regsenha && !confsenha)){

        res.render(__dirname + '/../views/user/cadastro', {title: 'Cadastro', errStatus: 304})
    }
    else if((regsenha != confsenha)){

        res.render(__dirname + '/../views/user/cadastro', {title: 'Cadastro', errStatus: 305})
    }
    else if(email.match(validRegex) && (regsenha == confsenha)){

    session.cadastro = {
        email: email,
        senha: confsenha
    }

    session.save((err) => {
        console.log(err);
    });

    res.redirect("/cadastro/identidade")
    }

        
})

router.post('/new2', (req,res) => {
    
    const session = req.session;
    const email = session.cadastro.email;
    const senha = session.cadastro.senha;
    const username = req.body.username;
    const usertag = req.body.usertag;
    
    if(!req.files){
        
        if(!email){
            res.redirect("/cadastro")
        }
        else if(!senha){
            res.redirect("/cadastro")
        }
    
        if(!username){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 303});
        }
        else if(!usertag){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 304});
        }
        else if( usertag.search( /\s/g ) != -1 || usertag.search( "@" ) != -1 ){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 305});
        }else{
            
            const novoUsuario = {
                email: email,
                username: username,
                usertag: usertag,
                senha: senha,
            }
    
            new Usuario(novoUsuario).save().then(() => {
                // console.log("Usuário cadastrado com sucesso!");
                session.destroy()
                res.redirect("/login")
            }).catch((err) => {
                console.log("Ocorreu um erro ao cadastrar o usuário: " + err);
            })
            
        }
        
    }else{
        const arquivo = req.files.arquivo;

        const pasta = __dirname + "/../public/img/arquivos/"
        const nomeArquivo = arquivo.name;
        const novoNomeArquivo = uniqid();
        const extensao = nomeArquivo.split('.').pop().toLowerCase();
    
        const caminhoArquivo = pasta + novoNomeArquivo + '.' + extensao;

        if(!email){
            res.redirect("/cadastro")
        }
        else if(!senha){
            res.redirect("/cadastro")
        }
    
        if(!username){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 303});
        }
        else if(!usertag){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 304});
        }
        else if(usertag.search( /\s/g ) != -1 || usertag.search( "@" ) != -1 ){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 305});
        }
        else if(extensao !== 'jpg' && extensao !== 'jpeg' && extensao !== 'png'){
            // console.log(extensao);
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 306});
        }
        else if(arquivo.size >= 2097152){
            res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 307});
        }else{
           
            fs.writeFile(caminhoArquivo, arquivo.data, (err) => {
                if(err == null){
                    // console.log("Arquivo enviado com sucesso!");
                }else{
                    res.render(__dirname + '/../views/user/cadastrouser', {title: 'Cadastro de Identidade', errStatus: 308});
                    console.log("Ocorreu um erro ao enviar o arquivo: " + err);
                }
            })
    
            const novoUsuario = {
                email: email,
                username: username,
                usertag: usertag,
                senha: senha,
                avatar: novoNomeArquivo + "." + extensao
            }
    
            new Usuario(novoUsuario).save().then(() => {
                // console.log("Usuário cadastrado com sucesso!");
                session.destroy()
                res.redirect("/login")
            }).catch((err) => {
                console.log("Ocorreu um erro ao cadastrar o usuário: " + err);
            })
            
        }
    }

    
    
})

module.exports = router;