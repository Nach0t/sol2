const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rankingRouter = require('./routes/ranking');
const registerRouter = require('./routes/register'); // Si agregas register

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ranking', rankingRouter);
app.use('/api', registerRouter); // para POST /api/register

module.exports = app;
