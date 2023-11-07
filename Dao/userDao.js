const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios")

// Método para ler um usuário pela tag
Usuario.findByTag = async (tag) => {
  const result = await Usuario.findOne({usertag: tag});

  return result;
};

Usuario.validate = async (tag, senha) => {
    const result = await Usuario.findOne({usertag: tag, senha: senha});
    //console.log(result);
    return result;
}

// Método para ler todos os usuários
Usuario.findAll = async () => {
  const result = await Usuario.find();

  return result;
};

// Método para excluir um usuário
Usuario.deleteByTag = async (tag) => {
  await Usuario.deleteOne({ usertag: tag });
};

module.exports = Usuario;
