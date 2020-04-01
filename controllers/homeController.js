const path = require('path');
const fs = require('fs');

const homeController = {
  index: (req, res) => {
    let servicos = [
      { nome: 'Dev Full Stack', imagem: '/imagens/undraw_dev_focus.svg'},
      { nome: 'Marketing Digital', imagem: '/imagens/undraw_social_dashboard.svg'},
      { nome: 'Consultoria UX', imagem: '/imagens/undraw_mobile_apps.svg'}
    ];

    let banners = [
      '/imagens/banner.jpg', 
      '/imagens/banner3.jpg', 
    ];

    res.render(
      'index', 
      { title: 'Home', listaServicos: servicos, listaBanners: banners }
    );
  },
  contato: (req, res) => {
    let {nome, email, mensagem} = req.body;
    let datetime = new Date().getTime();

    let infoContato = {nome, email, mensagem};
    let infoContatoJSON = JSON.stringify(infoContato);
   
    const fileContato = path.join('db', 'Contatos.json');
  
    let listaContato = {};
    if(fs.existsSync(fileContato)){
      // Trazendo conteúdo do arquivo em formato JSON
      listaContato = fs.readFileSync(fileContato, {encoding: 'utf-8'});
      // Transformando JSON em objeto
      listaContato = JSON.parse(listaContato);
      // Pegando array de inscritos e adicionando a um novo email
      listaContato.contatos.push(infoContatoJSON);
    }else{
      listaContato = {
        contatos: [infoContatoJSON]
      };
    }
    // Transformando obj em JSON
    listaContato = JSON.stringify(listaContato);
    // guardando lista de inscritos com o novo email
    fs.writeFileSync(fileContato, listaContato);
    
    res.render('contato', {nome, email, mensagem, title: 'Contato'});
  },
  newsletter: (req, res) => {
    let {email} = req.query;
    let infoNewsletterJSON = JSON.stringify({email});

    const fileNewsletter = path.join('db', 'Newsletter.json');

    let listaNewsletter = {};
    if(fs.existsSync(fileNewsletter)){
      // Trazendo conteúdo do arquivo em formato JSON
      listaNewsletter = fs.readFileSync(fileNewsletter, {encoding: 'utf-8'});
      // Transformando JSON em objeto
      listaNewsletter = JSON.parse(listaNewsletter);
      // Pegando array de inscritos e adicionando a um novo email
      listaNewsletter.inscritos.push(email);
    }else{
      listaNewsletter = {
        inscritos: [email]
      };
    }
    // Transformando obj em JSON
    listaNewsletter = JSON.stringify(listaNewsletter);
    // guardando lista de inscritos com o novo email
    fs.writeFileSync(fileNewsletter, listaNewsletter);

    res.render('newsletter', {email, title: 'Newsletter'});
  }
};

    // POST - req.body
    // GET - req.query
    // GET /:email - req.params


module.exports = homeController;