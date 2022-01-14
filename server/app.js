const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const MongoStore = require('connect-mongo');

const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');
const routes = require('./routes');
const auth = require('./lib/auth');

function app(config) {
  const app = express();
  app.locals.title = config.sitename;
  const speakers = new SpeakerService(config.data.speakers);
  const feedback = new FeedbackService(config.data.feedback);

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, './views'));
  
  app.use('/', express.static(path.join(__dirname, '../public')));
  app.get('/favicon.ico', (_req, res) => res.sendStatus(204)); // * No Content

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.database.dsn,
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1
    })
  }));

  app.use(auth.initialize);
  app.use(auth.session);
  app.use(auth.setUser);
  
  // * Middleware to set speakerNames
  app.use(async (_req, res, next) => {
    try {
      const names = await speakers.getNames();
      res.locals.speakerNames = names;
      return next();
    } catch (error) {
      return next(error);
    }
  });

  app.use('/', routes({speakers, feedback}));

  // * catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    next(createError(404));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  // * Error Handler
  app.use((err, req, res, _next) => {
    res.locals.message = err.message;
    const status = err.status || 500; // If no status is provided, let's assume it's a 500
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    res.render('error');
  });

  return app;
}

module.exports = app;