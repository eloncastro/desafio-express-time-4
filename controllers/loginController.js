const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

loginController = {
    index: (req, res) => {
        res.render('login', {title: "Login de usuário", erro: ''});
    },
    login: (req, res) => {
        let {email,senha} = req.body;
        
        let usuarioLogado = false;

        // senha = bcrypt.hashSync(senha, 10);

        const file = path.join('db', 'Usuarios.json');

        let listaUsuarios = {};
        if(fs.existsSync(file)){
            // trazendo conteudo do arquivo em formato JSON
            listaUsuarios = fs.readFileSync(file, { encoding: 'utf-8'});
            // transformando JSON em obj
            listaUsuarios = JSON.parse(listaUsuarios);
            // percorrer usuarios cadastrados
            for (let usuario of listaUsuarios.inscritos) {
                if(usuario.email == email && usuario.senha == senha) {
                    usuarioLogado = true;
                    req.session.emailUsuario = email;
                }
            }
            if(usuarioLogado) {
                res.redirect('/admin');
               // res.render('admin', {title: "Admin", listaEmails: {inscritos: ''}, listaContatos: {inscritos: ''}});
            }
            else {
                res.render('login', {title: 'Login de usuários', erro: 'usuario nao encontrado!!'});
            }
            
        } else {
            res.render('login', {title: 'Login de usuários', erro: 'usuario nao encontrado'});
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }

};

module.exports = loginController;