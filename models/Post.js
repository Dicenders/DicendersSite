const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqid = require('uniqid')

const post = new Schema({
    
    byTag: {
        type: String,
        required: true
    },
    byName: {
        type: String,
        required:true
    },
    byAvatar: {
        type: String,
        default: "logofundo.png"
    },
    conteudo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now(),
        
    },
    likes: {
        type: Array
    },
    comments: {
        type: Array
    },
    link: {
        type: String,
        default: Date.now().toString(12) + Math.random(360).toFixed(5).slice(2),
    }
    
})



mongoose.model("posts", post)

// const NovoPostTeste = {
//     by: "osama bin laden",
//     conteudo: "KABOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM",
// }

// new Post(NovoPostTeste).save().then(() => {
//     console.log("Deu bom principe");
// })
