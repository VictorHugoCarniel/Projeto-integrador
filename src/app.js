const { config } = require('dotenv');
const { userInfo } = require('os');
const { equal } = require('assert');
const { where } = require('sequelize');
const { reset } = require('nodemon');[]
// const ejs = require('ejs');

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const multer = require('multer');
const multerConfig = require("./config/multer");

const app = express();
const path = require('path');
const handlebars = require("express3-handlebars").create(); // engine
const crypto = require('crypto');

const fs = require('fs');

const User = require('../models/User');
const Produtos = require('../models/Produtos');
const Estoque = require('../models/Estoque');
const Improds = require('../models/imgProd');
const Tipo = require('../models/TipoProduto.js');

const bodyParser = require('body-parser');
const { json } = require('body-parser');

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

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

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.redirect('/home')
})
app.get('/home', async (req, res) => {
    if (req.session.loggedIn == true) {
      var rows = await Produtos.findAll({})
        res.render('index', { rows })
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
    console.log('teste')
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
    const rows = await Tipo.findAll({})
    res.render('admCadAlimentos', { rows }) });

app.post("/posts", multer(multerConfig).single('file'), async(req, res) => {

    const {originalname: name, size, key, url = "" } = req.file;

    const post = await Improds.create ({
        name,
        size,
        key,
        url
    });

    return res.json(post)
});

//Cadastro Alimentos
app.post('/add-alimentos', async (req, res) => {

    await Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        peso: req.body.peso,
        imagem: req.body.imagem,
        idTipoProduto: req.body.idTipoProduto
    })

    console.log("deu certo")
    res.redirect('/administrador')
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