const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqid = require('uniqid')

const message = new Schema({
    
    createdAt: {
        type: Date,
        required: true
    },
    remetente: {
        type: String,
        required:true
    },
    receptor: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
})



mongoose.model("messages", message)

// const NovoPostTeste = {
//     by: "osama bin laden",
//     conteudo: "KABOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM",
// }

// new Post(NovoPostTeste).save().then(() => {
//     console.log("Deu bom principe");
// })
