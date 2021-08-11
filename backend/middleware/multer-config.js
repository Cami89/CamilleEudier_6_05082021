const multer = require('multer');

const MIME_TYPES = { // objet pour extention
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
  
const storage = multer.diskStorage({ // objet storage + fonction disque storage de multer
    destination: (req, file, callback) => { // dans quel dossier doit enregistrer fichiers
      callback(null, 'images'); // rappel du callback (null = pas d'erreur + nom dossier)
    },
    filename: (req, file, callback) => { // argument allant générer nom de fichier (doivent être tous différents)
      const name = file.originalname.split(' ').join('_'); // = nom du fichier d'origine + remplacer espaces par tirets
      const extension = MIME_TYPES[file.mimetype]; // ajout des mimes types pour l'extention 
      callback(null, name + Date.now() + '.' + extension); // rappel callback = si 0 erreur, name + date du jour + . + extention
    }
});
  
module.exports = multer({storage: storage}).single('image'); // export multer avec objet storage + identication 1 image