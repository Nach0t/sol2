const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
