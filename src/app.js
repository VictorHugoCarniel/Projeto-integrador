const { config } = require('dotenv');
const express = require('express');
const { connection } = require('mongoose');
const { reset } = require('nodemon');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const ejs = require('ejs');
const session = require('express-session');
const morgan = require('morgan');
const Busboy = require('busboy');
const fs = require('fs');
const User = require('../models/User');
const Produtos = require('../models/Produtos');
const Estoque = require('../models/Estoque');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const { userInfo } = require('os');
const { equal } = require('assert');
const { where } = require('sequelize');
const multer = require('multer');

// app.post('/cadastrar', async (req, res) => {
//     const {name, sobrenome, email, telefone, senha} = req.body

//     const usuario = await Usuario.create;

//     res.json({Usuario})
// })

// app.use(express.static(__dirname + '/public'));

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);


const DADOS_CRIPTOGRAFAR = {
    algoritmo: 'aes256',
    segredo: 'chaves',
    tipo: 'hex'
};
function criptografar(password) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(password);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

app.use('/public', express.static(path.join('public')))
app.set('/views', (path.join('views')))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

const handlebars = require("express3-handlebars").create();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.redirect('/home')
})
app.get('/home', (req, res) => {
    if (req.session.loggedIn == true) {
        res.render('index')
    } else {
        res.redirect('/login')
    }
})

app.get('/testee', async (req, res) => {
    rows = await User.findAll({})
    res.render('teste', { rows })
})


// Login
app.get('/login', (req, res) => {
    res.render('login')
});
app.get('/sobre', (req, res) => {
    res.render('sobre')
});

app.post('/auth', async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    if (email && senha) {
        const usuario = await User.findOne({
            where:
            {
                email: email,
                senha: criptografar(senha)

            }
        });
        if (usuario) {
            req.session.loggedIn = true;
            res.redirect('/home')
            // const rows = await User.findAll();
            // var result = '';
            // for (item of rows) {
            //     var login = document.querySelector("#login") -

            //         function alteraCampoLogado() {
            //             login.innerHTML = item.nome
            //         }
            // }
            // res.send(result)f
        } else {
            res.redirect('/login')
        }
    }
})

app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/login')
})

// cadastro
app.post('/add-usuario', async (req, res) => {
    await User.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        telefone: req.body.telefone,
        cidade: req.body.cidade,
        senha: criptografar(req.body.senha)
    })
    res.redirect('/login')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});

// adm
app.get('/administrador', async (req, res) => {
    const rows = await Produtos.findAll({})
    res.render('admCadAlimentos', { rows });
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/douglas.8998/Documents/GitHub/Projeto-integrador/public/upload')},

        filename:(req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
})

 const upload = multer({ storage });
//Cadastro Alimentos
app.post('/add-alimentos', async (req, res) => {

    await Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        peso: req.body.peso,
        tipo: req.body.tipo,
        imagem: req.body.imagem
    })

    console.log("deu certo")
    res.redirect('/administrador')
})

app.get('/a', async (req, res) => {
    res.render('admCadAlimentos');
})
app.post('/a',upload.single('img'), async (req, res) => {
    console.log(req.body, req.file)
    res.send('ok')
})

app.get('/admQtd', async (req, res) => {
    rows = await Produtos.findAll({})
    res.render('admQtd', { rows })
})

app.post('/add-quantidade/:id', async (req, res) => {
    const id_param = req.params.id;
    let quantidade = req.body.quantidade;

    Produtos.update(
        { quantidade: quantidade },
        {
            where: {
                idProduto: id_param,
            },
        }
    );
    res.redirect('/admQtd')
})

//Delete produtos
app.post('/deleteProd/:id', async (req, res) => {
    const id = req.params.id;
    await Produtos.destroy({
        where: {
            idProduto: id
        }
    });
    res.redirect('/admQtd')
})


module.exports = app;