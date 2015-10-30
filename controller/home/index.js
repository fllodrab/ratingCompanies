// Dependencias
var empresa = require(__dirname + '/../lib/empresa');

// Función para procesar el nombre que se va a pasar a la librería
var procesaNombre = function(cadena) {
  cadena = cadena.replace(':', '');
  cadena = cadena.toUpperCase();
  return cadena;
}

// Pagina de inicio
exports.index = function(req, res) {
  res.render('index', {});
};

// Enlace para crear empresas
exports.crearEmpresa = function(req, res) {
  empresa.crearEmpresa({
    empresa: procesaNombre(req.params.empresa)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

// Enlace para listas calificaciones
exports.listarCalificaciones = function(req, res) {
  var nombreEmpresa = procesaNombre(req.params.empresa);

  empresa.listarCalificaciones({
    empresa: nombreEmpresa
  }, function(error, data) {
    res.render('index', {
      empresa: nombreEmpresa,
      lista: data
    });
  });
};

// Enlace para crear calificaciones
exports.crearCalificacion = function(req, res) {
  empresa.crearCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno),
    calificacion: procesaNombre(req.params.calificacion)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

// Enlace para borrar calificaciones
exports.borrarCalificacion = function(req, res) {
  empresa.borrarCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

// Enlace para actualizar calificaciones
exports.actualizarCalificacion = function(req, res) {
  empresa.actualizarCalificacion({
    empresa: procesaNombre(req.params.empresa),
    alumno: procesaNombre(req.params.alumno),
    calificacion: procesaNombre(req.params.calificacion)
  }, function(error, data) {
    res.render('index', {
      mensaje: data
    });
  });
};

// Enlace para generar ranking de empresas
exports.generarRanking = function(req, res) {
  empresa.generarRanking(function(error, data) {
    res.render('index', {
      ranking: data
    });
  });
};
