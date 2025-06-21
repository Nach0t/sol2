require('dotenv').config(); // asegúrate de que esté en la raíz del proyecto

module.exports = {
  mongoURI: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};
