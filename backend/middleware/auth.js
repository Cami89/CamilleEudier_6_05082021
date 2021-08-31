// Import 
const jwt = require('jsonwebtoken'); 

// export du middleware
module.exports = (req, res, next) => {  
    try { 
      const token = req.headers.authorization.split(' ')[1]; 
      const decodedToken = jwt.verify(token, 'PIiQUANTEp6op'); 
      const userId = decodedToken.userId; 
      req.userId = userId;
      next(); 
      
    } catch { 
      res.status(401).json({
        error: new Error('Requête non valide')
      });
    }
  };