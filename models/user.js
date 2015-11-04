// models/User.js

module.exports = function(mongoose) {

  var Schema = mongoose.Schema;

  // Objeto modelo de Mongoose
  var UserSchema = new Schema({

    // Propiedad nombre
    name: String, // tipo de dato cadena de caracteres

    // Propiedad fecha de nacimiento
    rate: Number, // tipo de dato calificación
  });

  return mongoose.model('User', UserSchema);
}
