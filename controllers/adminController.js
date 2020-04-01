const path = require('path');
const fs = require('fs');

const adminController = {
    index: (req, res) => {
    //   let inscritos = ["eu@mail.com", "fulano@mail.com"];
      const caminho = path.join('db', 'newsletter.json');
      let inscritos = fs.readFileSync(caminho, {encoding: 'utf-8'});
      let inscritosObj = JSON.parse(inscritos);

      const caminhoContatos = path.join('db', 'Contatos.json');
      let contatos = fs.readFileSync(caminhoContatos, {encoding: 'utf-8'});
      let contatosObj = JSON.parse(contatos);
      res.render('admin', {title: "Admin", listaEmails: inscritosObj.inscritos, listaContatos: contatosObj.contatos});
    }
}

module.exports = adminController; 