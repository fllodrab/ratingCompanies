// Dependencias
var express = require('express');
var http = require('http');
var path = require('path');
// hacemos referencia a la dependencia
var mongodb = require('mongodb');

// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
var server = new mongodb.Server("127.0.0.1", 27017, {});

// obtenemos la base de datos de prueba que creamos
var dbTest = new mongodb.Db('unTestDB', server, {})

// abrimos la base pasando el callback para cuando esté lista para usar
dbTest.open(function (error, client) {
  if (error) throw error;

  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo

  //Obtenemos la coleccion personas que creamos antes
  var collection = new mongodb.Collection(client, 'personas');

  //disparamos un query buscando la persona que habiamos insertado por consola
  collection.find({'nombre': 'pepe'}).toArray(function(err, docs) {

    //imprimimos en la consola el resultado
    console.dir(docs);
  });
});

// Rutas
var index = require(__dirname + '/controllers/home/index');

// Crea aplicación web con Express
var app = express();

// Funcionalidades
app.get('/', index.index);
app.get('/crearEmpresa/:empresa', index.crearEmpresa);
app.get('/listarCalificaciones/:empresa', index.listarCalificaciones)
app.get('/crearCalificacion/:empresa/:alumno/:calificacion', index.crearCalificacion);
app.get('/borrarCalificacion/:empresa/:alumno', index.borrarCalificacion);
app.get('/actualizarCalificacion/:empresa/:alumno/:calificacion', index.actualizarCalificacion);
app.get('/generarRanking', index.generarRanking);

// Variables de entorno
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
// Directorio con las plantillas
app.set('views', path.join(__dirname, 'views'));
// Motor de visualización
app.set('view engine', 'jade');

//Favicon
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
//Logger de solicitudes HTTP
app.use(express.logger('dev'));
//Manejador de enrutado
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//Página de error
app.use(function(req, res, next) {
  res.status(404).render('index', {
    mensaje: 'Error 404: Página no encontrada o parámetros inválidos.'
  });
});

// Creación del servidor
http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('Servidor Express escuchando en ' + app.get('ip') + ':' + app.get('port'));
});
