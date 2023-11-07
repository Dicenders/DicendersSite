const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Grid")
const Grid = mongoose.model("grids")

router.get("/:id", async (req,res) => {
    const id = req.params.id;

    const result = await Grid.findOne({id: id})
    if(result != null){
        
        res.render(__dirname + '/../views/user/grid', {title: 'Grid', layout: 'grid', link: id, grid: result.conteudo})
    }else{
        res.send("Nenhum grid encontrado.")
    }
})

module.exports = router;