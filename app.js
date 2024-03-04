// Express-generator did this file, I just cleaned it a little to remove some useless stuff

import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import charactersRouter from './routes/characters/index.js';
import moviesRouter from './routes/movies/index.js';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/characters', charactersRouter);
app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
