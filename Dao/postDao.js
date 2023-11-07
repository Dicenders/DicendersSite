const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts")

// Método para ler um Post pela tag
Post.findByLink = async (link) => {
  const result = await Post.findOne({link: link});

  return result;
};

// Método para ler todos os usuários
Post.findAll = async () => {
  const result = await Post.find();

  return result;
};

// Método para excluir um usuário
Post.deleteByLink = async (link) => {
  await Post.deleteOne({ link: link });
};

module.exports = Post;
