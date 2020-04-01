const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

usuariosController = {
    index: (req, res) => {
        res.render('cadastroUsuario', {title: "Cadastro de usuário"});
    },
    cadastro: (req, res) => {
        let {nome,email,senha} = req.body;

        senha = bcrypt.hashSync(senha, 10);

        const file = path.join('db', 'Usuarios.json');

        let listaUsuarios = {};
        if(fs.existsSync(file)){
            // trazendo conteudo do arquivo em formato JSON
            listaUsuarios = fs.readFileSync(file, { encoding: 'utf-8'});
            // transformando JSON em obj
            listaUsuarios = JSON.parse(listaUsuarios);
            // pegando array de inscritos e adicionando um novo email
            listaUsuarios.inscritos.push({nome,email,senha});
        } else {
            listaUsuarios = {
                inscritos: [{nome,email,senha}]
            };

        }

        // transforma obj em JSON
        listaUsuarios = JSON.stringify(listaUsuarios);
        // guardando lista de usuários inscritos
        fs.writeFileSync(file, listaUsuarios);
        
        res.render('cadastroUsuario', {title: 'Cadastro de usuários'});
    }
};

module.exports = usuariosController;