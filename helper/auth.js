require("dotenv").config()
const jwt = require('jsonwebtoken');
const user = require('../models/User')

module.exports = {
  auth: (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log("HEADER", authHeader);
    const token = authHeader.split(" ")[1]
    // console.log("TOKEN:", token)

    if (token == null) return res.json("missing token")

    try {
      const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)
    //   console.log("TOKEN Valid:", isTokenValid)
      if (isTokenValid) {
        let {...rest} = isTokenValid

        req.body = rest
        next()
      }
    } catch (error) {
      res.json("token is not valid")
      console.log("token is not valid");
    }
  },
  isAdmin: function (req, res, next) {
    console.log("data user: ",req.body)
    // if(req.user == null)
    //   return res.json({
    //     message:'Access denied, you re not Logged In'
    //   })
    if(req.body.role == 'admin')
      next();
    else
      return res.json({
        message:'Access denied, you re not an Admin'
      })
  },
  userOwnOrIsAdmin: function (req, res, next){
    console.log("data user or admin: ", req.body)
    
    if(req.body.role == 'admin' || req.body._id == req.body._id )
      next();
    else 
      return res.json({
        message:'Access denied, you re not admin or this is not your own'
      })
  }
}