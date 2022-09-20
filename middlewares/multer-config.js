const multer = require('multer');

//création d'un dictionnaire MIME_TYPES de types de fichiers

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//On crée un objet de configuration pour multer

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//On exporte le middleware multer avec l'objet storage

module.exports = multer({ storage }).single('image');