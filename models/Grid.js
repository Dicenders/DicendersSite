const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grid = new Schema({
    
    id: {
        type: String,
        required: true,
        default: Date.now().toString(12) + Math.random(360).toFixed(5).slice(2)
    },
    permissions: {
        type: Array
    },
    conteudo: {
        type: String,
    }
})



mongoose.model("grids", grid)

//  const NovoGrid = {
//      id: Date.now().toString(12) + Math.random(360).toFixed(5).slice(2)
//  }

// new Grid(NovoGrid).save().then(() => {
//      console.log("Deu bom principe");
//  })

 
