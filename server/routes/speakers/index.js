const router = require('express').Router();

module.exports = (params) => {
  const { speakers } = params;

  router.get('/', async (_req, res) => {
    const speakerslist = await speakers.getList();
    const artwork = await speakers.getAllArtwork();
    return res.render('speakers', { page: 'All Speakers', speakerslist, artwork });
  });

  router.get('/:name', async (req, res, next) => {
    const speaker = await speakers.getSpeaker(req.params.name);
    
    if (!speaker) return next(); // * This will fall through and create a NOT FOUND
    
    const artwork = await speakers.getArtworkForSpeaker(req.params.name);
    console.log(speaker);
    console.log(artwork);
    return res.render('speakers/detail', {
      page: req.params.name, artwork, speaker,
    });
  });
  return router;
};
