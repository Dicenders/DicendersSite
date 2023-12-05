const express = require('express');
const router = express.Router();
const session  = require('../app');
const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts");
require("../Dao/postDao");
require("../models/Grid");
const Grid = mongoose.model("grids");





router.get('/', async (req,res) => {

    const session = req.session;



    if(!session.login){
        res.redirect("/login")
    }else{

        const usertag = session.login.usertag;
        const username = session.login.username;
        const avatar = "/img/arquivos/" + session.login.avatar;
 
       await Post.find().sort({data: 'desc'}).lean().then(async (posts) => {
            await Grid.find().sort({data: 'desc'}).lean().then((grids) => {
            res.render(__dirname + '/../views/user/menu', {title: 'Home', usertag: usertag, username: username, avatar: avatar, posts: posts, grids: grids})
            })
        })
    
        
    }
    
})

router.get('/logout', (req,res) => {
    
    const session = req.session;
    
    session.destroy()
    
    res.redirect("/login")
})

module.exports = router;
