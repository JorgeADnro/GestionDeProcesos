const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true // Hacer que el nombre de usuario sea obligatorio
  },
  email: {
    type: String,
    required: true // Hacer que el correo electrónico sea obligatorio
  },
  password: {
    type: String,
    required: true // Hacer que la contraseña sea obligatoria
  },
  role: {
    type: String,
    default: 'regular'
  },
  code: {
    type: Number,
    default: null,
    required: false
  }
});

module.exports = model('userReg', userSchema);
