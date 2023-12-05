const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Grid")
const Grid = mongoose.model("grids")

router.get("/:id", async (req,res) => {
    const id = req.params.id;

    const result = await Grid.findOne({id: id})
    if(result != null){
        
        res.render(__dirname + '/../views/user/grid', {title: 'Grid', layout: 'grid', link: id, grid: result.conteudo, usertag: "User"})
    }else{
        res.send("Nenhum grid encontrado.")
    }
})

router.post("/new", (req,res) => {
    let id = Date.now().toString(12) + Math.random(360).toFixed(5).slice(2);
    const novoGrid = {
        id: id
    }
    new Grid(novoGrid).save().then(() => {
        res.redirect("/grid/"+ id)
    }).catch((err) => {
        console.log("Não foi possivel criar o grid: "+ err);
    })
})

module.exports = router;