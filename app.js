//Carregando Módulos

const mongoose = require("mongoose");
const express = require("express");
const handlebars = require("express-handlebars");
const fileupload = require("express-fileupload")
const path = require("path");
const app = express();
const session = require('express-session');
const cadastro = require('./routes/cadastro')
const login = require('./routes/login')
const home = require('./routes/home')
const social = require('./routes/social');
const configuracao = require('./routes/config');
const grid = require('./routes/grid');
const { stringify } = require("querystring");
const {Server} = require("socket.io")
const http = require("http");
const { log } = require("console");
const { SocketAddress } = require("net");
const server = http.createServer(app)
require("./models/Message")
require("./models/Grid")
const Message = mongoose.model("messages")
const Post = mongoose.model("posts")
const Grid = mongoose.model("grids")
// const Grid = mongoose.model("grids")

//Config

    //Sessões

    app.use(session({
        secret: 'chavesupersecreta',
        resave: true,
        saveUninitialized: true
      }));

    //MiddleWares

    app.use(fileupload());

    //Body Parser

    app.use(express.urlencoded({extended: true}))
    app.use(express.json());

    //HandleBars

    app.engine('handlebars', handlebars.engine({
        helpers: require("handlebars-helpers")(),
        defaultLayout: 'main',
        layoutsDir: './views/layouts'
    }));
    app.set('view engine', 'handlebars');

    //Path

    app.use(express.static(path.join(__dirname, "/public")))

//Rotas
    
    app.get('/', (req,res) => {
        res.render(__dirname + "/views/index", {title: 'Dicenders - Rede de comunidades e mesa virtual de RPG'})
    })

    app.use('/cadastro', cadastro);
    app.use('/login', login);
    app.use('/home', home);
    app.use('/social', social);
    app.use('/configuracao', configuracao);
    app.use('/grid', grid);

//Servidores

/*
       Message.deleteMany().then(() => {
          console.log("Mensagens apagadas com sucesso!")
        })
*/
    const io = new Server(server, {
        maxHttpBufferSize: 5242880, pingTimeout: 60000
    })

    io.on('connection', (socket) => {
        const link = socket.handshake.auth.link
        const usertag = socket.handshake.auth.usertag
        const talkTo = socket.handshake.auth.talkTo
        socket.join(usertag + talkTo)
        socket.join(link)
        socket.join(talkTo + usertag)
         console.log('Um usuário foi conectado!');
        
        socket.on('disconnect', () => {
            
            console.log('Um usuário foi desconectado!');
        })

        socket.on('disconnecting', () => {
             console.log(socket.rooms);
        })

        socket.on('chat message', async (msg, by, to) => {
            //console.log('mensagem: ', msg);'

            let data =  new Date;
            let dia  =  data.getDate().toString().padStart(2, '0');
            let mes  =  (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
            let ano  =  data.getFullYear();
            let hora =  data.getHours();
            let minuto = data.getMinutes();

            time = await dia + "/" + mes + "/" + ano + " • " + hora + ":" + minuto

            
            io.to(usertag + talkTo).emit('chat message', msg, by, to, time);
            
            const novaMensagem = {
                createdAt: Date.now(),
                remetente: by,
                receptor: to,
                conteudo: msg
            }

            new Message(novaMensagem).save().then(() => {
                // console.log("Mensagem enviada com sucesso para o banco de dados")
            }).catch((e) =>{
                console.log("Ocorreu um erro ao enviar a mensagem: " + e)
            })
        })
        socket.on('addgrid', async (data, fullGrid) => {
            socket.broadcast.to(link).emit('addgrid', data)

            await Grid.updateOne({id: link}, {conteudo: JSON.stringify(fullGrid)})
        })
        socket.on('modgrid', async (data, indexR, fullGrid) => {
            socket.broadcast.to(link).emit('modgrid', data, indexR)
        })

        socket.on('delgrid', async (data, fullGrid) => {
            socket.broadcast.to(link).emit('delgrid', data)

            await Grid.updateOne({id: link}, {conteudo: JSON.stringify(fullGrid)})
        })

        socket.on('clsgrid', async (data, indexR, fullGrid) => {
            socket.broadcast.to(link).emit('clsgrid', data, indexR)

            await Grid.updateOne({id: link}, {conteudo: JSON.stringify(fullGrid)})
        })
         socket.on('lastMod', async (fullGrid) => {
            console.log("Grid atualizado com sucesso.");
            await Grid.updateOne({id: link}, {conteudo: JSON.stringify(fullGrid)})
         })
})
    

//Conexão com o Banco de Dados
    mongoose.Promise = global.Promise;
    const uri = "mongodb+srv://marcosdiarss31:Dic3nd3rs@cluster0.883qrnm.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(uri).then(() => {
        console.log("Banco de dados conectado com sucesso!");
    }).catch((err) => {
        console.log("Erro ao se conectar com o banco de dados: " + err);
    })

    

    module.exports = session;
    module.exports = io;
    
//Outros

    PORT = process.env.PORT || 8081;
    server.listen(PORT, () => {
        console.log("Servidor iniciado com sucesso!");
    })