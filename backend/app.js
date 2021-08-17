// fichier contenant applications

const express = require('express'); // import du module Express
const bodyParser = require('body-parser'); // import de body parser (analyse les corps des requêtes et renseigne la propriété req.body)
const mongoose = require('mongoose'); // import de mongoose (bdd)
const cors = require('cors');
const path = require('path'); // accès au système de fichier

const routes = require('./routes/index'); // import du router
const userRoutes = require('./routes/user/user.routes'); //import du router

const app = express(); // constante appellant méthode express (pour créer une appli express)

// connexion à mongoose (bdd)
mongoose.connect('mongodb+srv://Camille:cAc899296@clusterpiiquante.uwbdp.mongodb.net/Clusterpiiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Pour éviter problème CORS 
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requêtes envoyées vers l'API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoi des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    next();
});*/

app.use(cors());

app.use(bodyParser.json()); // transformation requête en objet JS

app.use('/images', express.static(path.join(__dirname, 'images'))); // middleware répondant aux req du /images + express.static permet accès à ressources statiques - créé sous dossier
app.use('/api', routes); // va chercher le fichier route


module.exports = app; // export d'app pour y accèder depuis autres fichiers (13)