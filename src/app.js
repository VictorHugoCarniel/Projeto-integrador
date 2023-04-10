//Framework
const { config } = require('dotenv');
const { userInfo } = require('os');
const { equal } = require('assert');
const { where } = require('sequelize');
const { reset } = require('nodemon');[]
const ejs = require('ejs');
// const ejs = require('ejs');
const storage1 = require('node-persist');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const multer = require('multer');
const multerConfig = require("./config/multer");
const app = express();
const path = require('path');
const handlebars = require('handlebars');
const { Op } = require("sequelize");

const handlebarss = require("express3-handlebars").create(); // engine
const crypto = require('crypto');
const fs = require('fs');
const flash = require('connect-flash');

const { create } = require('node-persist');
const storagee = create();



//Models
const User = require('../models/User');
const Produtos = require('../models/Produtos');
const Estoque = require('../models/Estoque');
const ImgProds = require('../models/imgProd');
const Pedido = require('../models/Pedidos');
const Tipo = require('../models/TipoProduto.js');

const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { framework } = require('passport');

const nodemailer = require('nodemailer');
const { get } = require('http');

require("dotenv").config();

app.use(flash());


const nome = require('../public/js/carrinho');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.engine("handlebars", handlebarss.engine);
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

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
}

function primeiroNome(str) {
    str = str.trim();
    const espacoIndex = str.indexOf(' ');
    if (espacoIndex === -1) {
        return str;
    }
    return str.substring(0, espacoIndex);
}

var nomeUser = "caraiooo"

var buf = crypto.randomBytes(3);
var lostmail = ''
var validaAdmin = false

//Rotas

app.get('/config', async (req, res) => {
    res.render('configUser')
});

app.get("/pedidos", async (req, res) => {



    const { idPedido, produto, cliente = req.body.filtroCli, preco, quantidade, data } = req.query;

    const filtro = {};

    if (idPedido) filtro.idPedido = idPedido;
    if (produto) filtro.produto = { [Op.like]: `%${produto}%` };
    if (cliente) filtro.cliente = { [Op.like]: `%${cliente}%` };
    if (preco) filtro.preco = preco;
    if (quantidade) filtro.quantidade = quantidade;
    if (data) filtro.data = data;

    const pedidos = await Pedido.findAll({ filtro })

    res.render('pedidos', { pedidos });
});

app.get("/valida", async (req, res) => {
    if (buf == buf) {
        buf = crypto.randomBytes(3);
    }
    res.render('valida');
})

app.post("/valida", async (req, res) => {
    const mail = req.body.mail;
    const email = await User.findOne({
        where: { email: mail }
    });

    if (email) {

        const header = fs.readFileSync('./templates/header.handlebars', 'utf8');
        const resetsenha = fs.readFileSync('./templates/resetpass.handlebars', 'utf8');
        const welcome = fs.readFileSync('./templates/welcome.handlebars', 'utf8');
        const footer = fs.readFileSync('./templates/footer.handlebars', 'utf8');

        const varToPass = handlebars.compile(resetsenha);
        const texto = buf.toString('hex');
        const code = varToPass({ texto });

        const emailBody = `
            ${header}
            ${code}
            ${footer}
        `;

        var message = {
            from: "noreplay@celke.com.br",
            to: mail,
            subject: "Instrução para recuperar a senha",
            text: "teste",
            html: emailBody
        };

        transport.sendMail(message, function (err) {
            if (err) {
                // console.log("Erro: E-mail não enviado!  -  " + buf.toString('hex'))
            }
        });

        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: 'test@example.com', // Change to your recipient
            from: mail, // Change to your verified sender
            subject: 'Vei',
            text: 'agora vai nuepusilvio',
            html: emailBody,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        console.log('ok funfou')
        lostmail = mail
        res.redirect('/validar')
    } else {
        console.log("Email não existe em nosso banco de dados")
    }

})

app.get("/validar", async (req, res) => {
    res.render('validar')
    console.log(buf.toString('hex'))
})

app.get("/test", async (req, res) => {
    res.render('resetpass')
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
    res.render('redefinirSenha', { email: lostmail })
});

app.post('/redefinirSenha', async (req, res) => {
    // console.log('senha redefinir')
    // console.log(lostmail)

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

app.get('/testee', async (req, res) => {
    rows = await User.findAll({})
    res.render('teste', { rows })
});

// Logout
app.get('/logout', (req, res) => {
    //Desloga o usuario
    req.session.loggedIn = false;
    res.redirect('/login')
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

const EnviaId = require('../public/js/carrinho.js');
const { CodeArtifact } = require('aws-sdk');
app.get('/home', async (req, res) => {

    if (req.session.loggedIn == true) {
        const Usuario = req.session.user
        // console.log(Usuario)
        const usuario = await User.findOne({
            where: {
                email: Usuario,
                idTipoUsuario: 1
            }
        });

        const user = await User.findOne({
            where: {
                email: Usuario
            }
        });

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
        });

        nomeUser = user.nome.capitalize()
        nomeUser = primeiroNome(nomeUser)

        if (usuario) {
            validaAdmin = true
            console.log(user.nome, "catapimbas meooo")
            res.render('indexADM', { rowsC, rowsB, nomeUser })
        } else {
            console.log(user.nome, "catapimbas meooo")
            res.render('index', { rowsC, rowsB, nomeUser })
        }
    } else {
        res.redirect('/login')
    }
});


// Inicializa o armazenamento

// Define a rota
app.get('/fechamento', async (req, res) => {
    await storagee.init({
        dir: './my-storage',
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,
        ttl: false,
        expiredInterval: 2 * 60 * 1000,
        forgiveParseErrors: false
    });
    
    const meuItem = await storagee.getItem('pedidos');
    console.log(meuItem);
    res.send(meuItem);
});



app.get('/logout', (req, res) => {
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
            idTipoUsuario: req.body.idTipoUsuario = 2
        })
        console.log('teste 90')
        res.redirect('/login')
    }
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});

// adm
app.get('/administrador', async (req, res) => {
    if (validaAdmin == true) {
        const rows = await Tipo.findAll({})
        res.render('admCadAlimentos', { rows })
    } else {
        res.render('404')
    }
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads') // Diretório onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

//Cadastro Alimentos
app.post('/add-alimentos', upload.single('imagem'), async (req, res) => {
    const imagePath = path.join('./public/uploads', req.file.filename);
    await Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        peso: req.body.peso,
        imagem: req.body.imagem,
        idTipoProduto: req.body.idTipoProduto,
        imgProd: imagePath,
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

//Vendeu
app.post('/dec-quantidade/:id', async (req, res) => {
    const id_param = req.params.id;
    let quantidade = req.body.quantidade;

    if (quantidade => quantidade => 0) {
        const produto = await Produtos.findOne({ where: { idProduto: id_param } });
        produto.quantidade = produto.quantidade - 1;
        await produto.save();
        console.log('O produtode id:', id_param, 'foi decrementado')
        res.redirect('/admQtd')
    } else {
        console.log('quantidade do produto de id:', id_param, 'é menor ou igual a 0')
    }
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
app.get('/produtos', async (req, res) => {
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
    res.render('produtos', { rowsC, rowsB })
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