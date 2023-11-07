const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuario = new Schema({
    
    email: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        required: true
    },

    usertag: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        default: "Olá, estou usando o Dicenders!"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String,
        default: "logofundo.png"
    },
    seguidores: {
        type: Array
    },
    seguindo: {
        type: Array
    }

})

mongoose.model("usuarios", usuario)
