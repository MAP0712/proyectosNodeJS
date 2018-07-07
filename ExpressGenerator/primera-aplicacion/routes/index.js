var express = require('express');
var router = express.Router();
const paginate = require('express-paginate');

const Films = require('../models/films_models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/inicio',(req,res)=>{
  res.render('vista.hbs',{
    title: 'Primera Vista',
    page: 'Pagina Variable',
    layout: 'template.hbs'
  });
})

router.get('/prueba',(req,res)=>{
  res.render('prueba.hbs',
{
  usuarios: [
    {id: 1, name: 'Ivan'},
    {id: 2, name: 'Antonio'},
    {id: 3, name: 'Jose'}
  ],
  administrador: {
    nombre: 'Ivan',
    apellido: 'Ruiz'
  },
  appName: 'Prueba',
  layout: 'template'
});
});

router.get('/listado', (req,res)=>{
  Films.fetchAll((error,films)=>{//este films es el parametro rows, que lo hemos llamado así
    if (error) return res.status(500).json(error);
    //console.log(films);
    res.render('films-list',{//este archivo es nuestro films-list.hbs que crearemos luego
      title: 'Listado de peliculas',
      layout: 'layout.hbs', //donde tenemos nuestro layout html de handlebars
      films
    })
  })
})

router.get('/insertar',(req,res)=>{
  const FILM ={
    "title": "Esto es una prueba",//funcionaria sin las comillas tambien
    language_id: 1 
  }
  Films.insert(FILM, (error, insertID)=>{
    if (insertID){
      return res.status(200).send('ID de la nueva pelicula=>' + insertID);
    }//se puede poner else sin problema, lo que pasa que aquise aprovecha el return de la funcion que ya se sale y no ejecutara la linea de debajo
    res.status(500).json(error)
  })
})

router.get('/pagination', (req,res)=>{
  let page = parseInt(req.query.page) || 1;
  let limit = req.query.limit || 20;
  let offset = req.skip || (page - 1) * limit;

  Films.paginate(offset,limit,(error,films)=>{
    if(error){
      return res.status(500).send(error);
    }else{
      const currentPage = offset === 0 ? 1 :(offset/limit) + 1;
      const totalCount = films.count[0].total;
      const pageCount = Math.ceil(totalCount/limit);
      const pagination = paginate.getArrayPages(req)(10,pageCount,currentPage) 

      res.render('pagination',{
        films: films.rows,
        currentPage,
        links: pagination,
        hasNext: paginate.hasNextPages(pageCount),
        pageCount
      });
    }
  });
});

module.exports = router;
