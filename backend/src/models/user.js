const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
