require("dotenv").config()
const jwt = require('jsonwebtoken');

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
        let {password, ...rest} = isTokenValid

        req.body = rest
        next()
      }
    } catch (error) {
      res.json("token is not valid")
      console.log("token is not valid");
    }
  }
}