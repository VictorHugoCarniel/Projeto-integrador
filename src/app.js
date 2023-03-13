//Framework
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
const flash = require('connect-flash');
const localStorage = require('localStorage');

//Models
const User = require('../models/User');
const Produtos = require('../models/Produtos');
const Estoque = require('../models/Estoque');
const ImProds = require('../models/imgProd');
const Tipo = require('../models/TipoProduto.js');

const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { framework } = require('passport');

const nodemailer = require('nodemailer');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { get } = require('http');

require("dotenv").config();

app.use(flash());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

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

var buf = crypto.randomBytes(3);
var lostmail = ''

// function getEmail(email) {
//     return email
// }

// getEmail(lostmail)

//Rotas

app.get("/valida", async (req, res) => {
    if(buf == buf){
        buf = crypto.randomBytes(3);
        console.log('jonas apelao')
    }
    res.render('valida');
    
    console.log(buf.toString('hex'))
})

app.post("/valida", async (req, res) => {
    const mail = req.body.mail
    const email = await User.findOne({
        where: { email: mail }
    });

    if (email) {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "42fff224361672",
                pass: "cc12b400c4b0eb"
            }
        });

        var message = {
            from: "noreplay@celke.com.br",
            to: mail,
            subject: "Instrução para recuperar a senha",
            text: "teste",
            html: "O seu codigo de verificação é: " + buf.toString('hex')
        };

        transport.sendMail(message, function (err) {
            if (err) {
                console.log("Erro: E-mail não enviado com sucesso!" + buf.toString('hex'))
            }
        });

        console.log('ok funfou')
        lostmail = mail
        res.redirect('/validar')
    } else {
        console.log("Email não tem no banco")
    }

})

app.get("/validar", async (req, res) => {
    res.render('validar')
    console.log(buf.toString('hex'))
})

app.post("/validar", async (req, res) => {
    const code = req.body.mail;
    console.log(buf.toString('hex'))

    if (code == buf.toString('hex')) {
        console.log("ate ai tudo bem")
        res.redirect('/redefinirSenha')
    } else {
        console.log("mermao deu ruim")
    }
})

app.get('/redefinirSenha', (req, res) => {
    res.render('redefinirSenha')
});

app.post('/redefinirSenha', async (req, res) => {
    console.log('senha redefinir')
    console.log(lostmail)

    const Senha = req.body.senha;
    const usuario = await User.findOne({
        where: { email: lostmail }
    });
    if (usuario) {
        console.log('user')
        User.update(
            { senha: criptografar(Senha) },
            {
                where: {
                    email: lostmail,
                }
            });
    }
    if (usuario) {
        res.render('login')
    }
});

app.use('/public', express.static(path.join('public')))

app.set('/views', (path.join('views')))

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', async (req, res) => {
    const { Op } = require("sequelize");
    if (req.session.loggedIn == true) {
        var rowsC = await Produtos.findAll({
            where: {
                idTipoProduto: 1,
                quantidade: {
                    [Op.ne]: 0
                }
            }
        })
        var rowsB = await Produtos.findAll({
            where: {
                idTipoProduto: 2,
                quantidade: {
                    [Op.ne]: 0
                }
            }
        })
    } else {
        res.redirect('/login')
    }
    res.render('index', { rowsC, rowsB })
})

app.get('/testee', async (req, res) => {
    rows = await User.findAll({})
    res.render('teste', { rows })
});

// Login
app.get('/login', (req, res) => {
    res.render('login')
});

//Sobre
app.get('/sobre', (req, res) => {
    res.render('sobre')
});

app.post('/auth', async (req, res) => {
    req.session.user = req.body.email
    const email = req.body.email;
    const senha = req.body.senha;
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
});

app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/login')
})

// cadastro
app.post('/add-usuario', async (req, res) => {
    console.log('teste')
    const usuario = await User.findOne({
        where: { email: req.body.email }
    });
    if (usuario) {
        console.log('teste2')
        req.session.message = {
            type: "danger",
            intro: "Hey,",
            message: "Um susuário com este e-mail já existe! Faça o formulário novamente"
        }
        console.log('teste3')
        res.redirect("/cadastro");
    } else {
        console.log('teste else')
        await User.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            telefone: req.body.telefone,
            cidade: req.body.cidade,
            senha: criptografar(req.body.senha),
            // idTipoUsuario: req.body.idTipoUsuario = 2
            idTipoUsuario: req.body.idTipoUsuario = 1
        })
        console.log('teste 90')
        res.redirect('/login')
    }
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});

// adm
app.get('/alimentosCad', async (req, res) => {
    const rows = await Tipo.findAll({})
    res.render('admCadAlimentos', { rows })
});

app.get('/administrador', async (req, res) => {
    const rows = await Tipo.findAll({})
    res.render('admCadAlimentos', { rows })
});

app.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    console.log('img')
    const { originalname: name, size, filename: key } = req.file;

    const post = await ImProds.create({
        name,
        size,
        key,
        url: ''
    });

    localStorage.getItem('produto', 1)
    "null" === localStorage.getItem('produto');

    return res.json(post)
});

//Cadastro Alimentos
app.post('/add-alimentos', async (req, res) => {
    await Produtos.create({
        nome: req.localStorage.nome,
        preco: req.body.preco,
        peso: req.body.peso,
        imagem: req.body.imagem,
        idTipoProduto: req.body.idTipoProduto,
        quantidade: req.body.quantidade = 0
    })

    console.log("deu certo")
    res.redirect('/administrador')
})

app.get('/admQtd', async (req, res) => {
    var rowsC = await Produtos.findAll({
        where: {
            idTipoProduto: 1
        }
    })
    var rowsB = await Produtos.findAll({
        where: {
            idTipoProduto: 2
        }
    })
    res.render('admQtd', { rowsC, rowsB })
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

app.post('/zera-quantidade/:id', async (req, res) => {
    let quantidade = req.body.quantidade;
    const id_parametro = req.params.id;

    if (quantidade <= quantidade <= 1) {
        console.log("zera");
        let quantidade = 0;
        Produtos.update(
            { quantidade: quantidade },
            {
                where: {
                    idProduto: id_parametro,
                },
            }
        );
        res.redirect('/admQtd')
    } else if (quantidade = 0) {
        console.log("quantidade eh igual a 0")
    }

})

// User

app.get('/user:id', async (req, res) => {
    console.log('cu Usuario')
    const id = req.params.id;
    var rowsC = await User.findAll({
        where: {
            id: 1
        }
    })
    res.render('user')
})

// Deixa essa rota no final ↴

app.use(function (req, res, next) {
    res.render('404', { url: req.url })
});

module.exports = app;