// https://www.youtube.com/watch?v=mbsmsi7l3r4
// Video malo -> https://www.youtube.com/watch?v=emiCMV-oVoE
// Codigo principalmente de https://github.com/WebDevSimplified/JWT-Authentication

const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401).send("Token Requerido")
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403).send("Token Invalido")
      req.user = user
      next()
    })
  }

  module.exports = {
    generateAccessToken, 
    authenticateToken
  }