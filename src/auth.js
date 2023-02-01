const passport = require('passport')
const crypto = require('crypto')
const LocalStratgy = require('passport-local').Strategy;

const User = require('../models/User');

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

module.exports = function(passport) {

    function findUser(email){
        return User.findOne({email: email})
    }
    function findUserById(id){
        return User.findOne({id: id})
    }

    passport.serializerUser((user, done) => {
        done(null, User.id);

    })
    passport.deserializeUser((id, done) => {
       try {
        const user = findUserById(id);
        done(null, user); 
       }
       catch(err){
            console.log(err);
            return done
       } 
    })
    passport.use(new LocalStratgy({
        usernameField: 'email',
        passwordField: 'senha'
    },
    (nome, senha, done) => {
        try{
            const user = findUser(nome);
            if(!user) return done(null, false)
        }
        catch(err) {
            console.log(err)
            done(err, false)
        }
    }))
}






