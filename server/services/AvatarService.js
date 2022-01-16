const { rm } = require('fs/promises');
const path = require('path');
const sharp = require("sharp");
const {v4: uuidv4} = require('uuid');

class AvatarService {
  constructor(directory) {
    this.directory = directory
  }

  async store(buffer) {
    const filename = AvatarService.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath)
    ;
  
    return filename;  
  }

  async thumbnail(filename) {
    return sharp(this.filepath(filename))
      .resize(50, 50)
      .toBuffer();
  }

  async delete(filename) {
    return rm(this.filepath(filename));
  }

  static filename() {
    return `${uuidv4()}.png`
  }

  filepath(filename) {
    return path.resolve(`${this.directory}/${filename}`);
  }
}

module.exports = AvatarService;