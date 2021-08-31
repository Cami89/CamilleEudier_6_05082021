// imports

const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const cors = require('cors');
const path = require('path');  
const helmet = require('helmet'); 

const routes = require('./routes/index'); 
const userRoutes = require('./routes/user/user.routes'); 

const app = express(); 

// connexion à mongoose 
mongoose.connect('mongodb+srv://Camille:cAc899296@clusterpiiquante.uwbdp.mongodb.net/Clusterpiiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Branchement middleware et application
app.use(cors());

app.use(bodyParser.json()); 

app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use('/api', routes); 

app.use(helmet());

// export d'app pour y accèder depuis autres fichiers

module.exports = app;  