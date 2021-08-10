const express = require('express'); // import du module Express
const bodyParser = require('body-parser'); // import de body parser (analyse les corps des requêtes et renseigne la propriété req.body)
const mongoose = require('mongoose'); // import de mongoose (bdd)
const cors = require('cors');

const routes = require('./routes/index'); // import du router
const userRoutes = require('./routes/user/user.routes'); //import du router

const app = express(); // appel de la méthode express pour notre appli (permet de créer une appli express)

// connexion à mongoose (bdd)
mongoose.connect('mongodb+srv://Camille:cAc899296@clusterpiiquante.uwbdp.mongodb.net/Clusterpiiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Pour éviter problème CORS (système de sécu qui lutte contre les requêtes malveillantes)
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requêtes envoyées vers l'API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoi des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    next();
});*/

app.use(cors());

app.use(bodyParser.json()); // transforme requête en objet JS

app.use('/api/sauces', routes); // va chercher le fichier route
app.use('/api/auth', userRoutes) 

module.exports = app; // export de l'appli express pour y accèder depuis autres fichiers