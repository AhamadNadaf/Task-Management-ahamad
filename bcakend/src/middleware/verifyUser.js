const jwt = require('jsonwebtoken')

const verifyuser = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.json("Token was not available")
    }else{
        jwt.verify(token, "secret-is-now-no-secret", (err, decode) => {
            if(err) return res.json("Token is wrong")
            next();
        })

    }
}

module.exports =  verifyuser