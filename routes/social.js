const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Post");
require("../models/Usuario");
require("../models/Message");
const Message = mongoose.model("messages")
const Usuario = mongoose.model("usuarios");
const Post = mongoose.model("posts");


router.get("/", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const usertag = session.login.usertag;
    const username = session.login.username;
    const avatar = "/img/arquivos/" + session.login.avatar;

    await Post.find()
      .sort({ data: "desc" })
      .lean()
      .then((posts) => {

        function dataAtualFormatada(dataInfo){
          var data = dataInfo
              dia  = data.getDate().toString().padStart(2, '0'),
              mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
              ano  = data.getFullYear();
              hora = data.getHours();
              minuto = data.getMinutes();
          return dia+"/"+mes+"/"+ano+" • "+hora+":"+minuto
        }
        posts.forEach(post => {
          
          
          post.data = dataAtualFormatada(post.data)
          


        });

        
      
        res.render(__dirname + "/../views/user/social", {
          title: "Social",
          usertag: usertag,
          username: username,
          avatar: avatar,
          posts: posts,
        });
      });
  }
});

router.get("/mensagens", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const usertag = session.login.usertag;
    const username = session.login.username;
    const avatar = "/img/arquivos/" + session.login.avatar;

    const result = await Usuario.findOne({ usertag: usertag })
    const seguindo = result.seguindo;

    await Message.find({$or: [ {remetente: usertag}, {receptor: usertag} ] }).sort({createdAt: "desc"}).lean().then(async (messages) => {

      const groupedMessages = {};
      for (const message of messages) {
        const otherUser = message.remetente !== usertag ? message.remetente : message.receptor;
        if (!groupedMessages[otherUser]) {
          const user = await Usuario.findOne({ usertag: otherUser }).lean();
          groupedMessages[otherUser] = {
            message: message,
            user: user
          };
        } else {
          if (message.createdAt > groupedMessages[otherUser].message.createdAt) {
            groupedMessages[otherUser].message = message;
          }
        }
      }
      
      const lastMessages = Object.values(groupedMessages);

      res.render(__dirname + "/../views/user/mensagens", {
        title: "Mensagens",
        usertag: usertag,
        username: username,
        avatar: avatar,
        lastMessages: lastMessages
      });
    })

    
  }
});

router.get("/mensagens/:user", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {

   

    const userParam = req.params.user;
    const result = await Usuario.findOne({ usertag: userParam });
    const usertag = session.login.usertag;
    const username = session.login.username;
    const avatar = "/img/arquivos/" + session.login.avatar;

    if (result != null) {
      const userTag = result.usertag;
      const userName = result.username;
      const userAvatar = "/img/arquivos/" + result.avatar;
      const userDesc = result.descricao;
      const userFollower = result.seguidores;
      const userFollowing = result.seguindo;

      await Message.find({$or: [ {remetente: usertag, receptor: userTag }, {receptor: usertag, remetente: userTag} ] }).sort({date: "desc"}).lean().then((messages) => {

        function dataAtualFormatada(dataInfo){
          var data = dataInfo
              dia  = data.getDate().toString().padStart(2, '0'),
              mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
              ano  = data.getFullYear();
              hora = data.getHours();
              minuto = data.getMinutes();
          return dia+"/"+mes+"/"+ano+" • "+hora+":"+minuto
        }

        messages.forEach(message => {
          
          message.createdAt = dataAtualFormatada(message.createdAt)
          
        });

        const modMessages = messages.map(message => {
          const autor = message.remetente === usertag;
          return { ...message, autor };
        });
        

        res.render(__dirname + "/../views/user/chat", {
          title: "Mensagens",
          usertag: usertag,
          username: username,
          avatar: avatar,
          userTag: userTag,
          userName: userName,
          userAvatar: userAvatar,
          userDesc: userDesc,
          userFollower: userFollower,
          userFollowing: userFollowing,
          messages: modMessages,
        });

      })

      
    }
  }
});

router.get("/notificacoes", (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const usertag = session.login.usertag;
    const username = session.login.username;
    const avatar = "/img/arquivos/" + session.login.avatar;

    res.render(__dirname + "/../views/user/notificacoes", {
      title: "Notificações",
      usertag: usertag,
      username: username,
      avatar: avatar,
    });
  }
});

router.post("/newpost", (req, res) => {
  const session = req.session;
  const byTag = session.login.usertag;
  const byName = session.login.username;
  const conteudo = req.body.conteudo;
  const byAvatar = "/img/arquivos/" + session.login.avatar;

  if (!conteudo) {
    res.redirect("/social");
  }

  const novoPost = {
    byTag: byTag,
    conteudo: conteudo,
    byAvatar: byAvatar,
    byName: byName,
    data: new Date(),
    link: Date.now().toString(12) + Math.random(360).toFixed(5).slice(2),
  };

  new Post(novoPost)
    .save()
    .then(() => {
      // console.log("Post publicado com sucesso!");
      res.redirect("/home");
    })
    .catch((err) => {
      // console.log("Não foi possivel publicar o post: " + err);
    });
});

router.get("/:perfil", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const perfParam = req.params.perfil;

    const result = await Usuario.findOne({ usertag: perfParam });

    if (result != null) {
      const usertag = session.login.usertag;
      const username = session.login.username;
      const avatar = "/img/arquivos/" + session.login.avatar;
      const profTag = result.usertag;
      const profName = result.username;
      const profAvatar = "/img/arquivos/" + result.avatar;
      const profDesc = result.descricao;
      const profFollower = result.seguidores;
      const profFollowing = result.seguindo;
      const result2 = await Usuario.findOne({ usertag: usertag });
      const exists = result2.seguindo.indexOf(perfParam);
      let folBut = "";

      if (exists < 0) {
        folBut = "Seguir";
      } else {
        folBut = "Seguindo";
      }

      await Post.find({ byTag: perfParam })
        .sort({ data: "desc" })
        .lean()
        .then((posts) => {

          function dataAtualFormatada(dataInfo){
            var data = dataInfo,
                dia  = data.getDate().toString().padStart(2, '0'),
                mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                ano  = data.getFullYear();
                hora = data.getHours();
                minuto = data.getMinutes();
            return dia+"/"+mes+"/"+ano+" "+hora+":"+minuto;
          }
          posts.forEach(post => {
            
            post.data = dataAtualFormatada(post.data)
            
          });
  
          res.render(__dirname + "/../views/user/perfil", {
            title: "Perfil de " + profTag,
            usertag: usertag,
            username: username,
            avatar: avatar,
            profTag: profTag,
            profName: profName,
            profAvatar: profAvatar,
            profFollower: profFollower,
            profFollowing: profFollowing,
            profDesc: profDesc,
            folBut: folBut,
            posts: posts,
          });
        });
    } else {
      res.redirect("/social");
    }
  }
});

router.post("/like/:like", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const likeParam = req.params.like;
    const user = session.login.usertag;

    const result = await Post.findOne({ link: likeParam });
    const exists = result.likes.indexOf(user);

    if (exists < 0) {
      const update = { $push: { likes: user } };
      const result = await Post.findOneAndUpdate({ link: likeParam }, update);
    } else {
      const update = { $pull: { likes: user } };
      const result = await Post.findOneAndUpdate({ link: likeParam }, update);
    }
    res.status(200).redirect("back");
  }
});

router.post("/follow/:follow", async (req, res) => {
  const session = req.session;

  if (!session.login) {
    res.redirect("/login");
  } else {
    const followParam = req.params.follow;
    const user = session.login.usertag;

    if (followParam != user) {
      const result = await Usuario.findOne({ usertag: followParam });
      const exists = result.seguidores.indexOf(user);

      if (exists < 0) {
        const update = { $push: { seguidores: user } };
        const result = await Usuario.findOneAndUpdate(
          { usertag: followParam },
          update
        );
        const update2 = { $push: { seguindo: followParam } };
        const result2 = await Usuario.findOneAndUpdate(
          { usertag: user },
          update2
        );
      } else {
        const update = { $pull: { seguidores: user } };
        const result = await Usuario.findOneAndUpdate(
          { usertag: followParam },
          update
        );
        const update2 = { $pull: { seguindo: followParam } };
        const result2 = await Usuario.findOneAndUpdate(
          { usertag: user },
          update2
        );
      }
      res.redirect("back");
    } else {
      res.redirect("back");
    }
  }
});

module.exports = router;
