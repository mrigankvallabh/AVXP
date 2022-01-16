const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  },
});

function handleAvatar(avatars) {
  return async (req, res, next) => {
    if(!req.file) return next();
    if(req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
      return next(new Error('Filetype not supported'));
    }

    req.file.storedFilename = await avatars.store(req.file.buffer);
    return next();
  }
}

module.exports = {upload, handleAvatar};
