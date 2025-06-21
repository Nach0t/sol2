const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const connectDB = require('./src/database/mongo');
connectDB();

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/users', require('./src/routes/users'));
app.use('/ranking', require('./src/routes/ranking'));
app.use('/api/register', require('./src/routes/register'));
app.use('/api/login', require('./src/routes/login'));

app.get('/', (req, res) => res.send('API funcionando 🚀'));

module.exports = app;
