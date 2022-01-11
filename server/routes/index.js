const router = require('express').Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const usersRoute = require('./users');

module.exports = (params) => {
  const { speakers } = params;

  router.get('/', async (_req, res) => {
    const speakerslist = await speakers.getListShort();
    const artwork = await speakers.getAllArtwork();
    return res.render('index', { page: 'Home', speakerslist, artwork });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/users', usersRoute(params));

  return router;
};
