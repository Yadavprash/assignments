const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const auth = req.headers.authorization;
    console.log(auth);
    const bearerToken = auth.split(" ");
    const Jwt_Token = bearerToken[1];
    console.log(Jwt_Token);
    const decoded = jwt.verify(Jwt_Token,JWT_SECRET);
    console.log(decoded.username);
    if(decoded.username){
        req.username = decoded.username;
        next();
    }else{
        res.status(403).json({
            err:"auth error"
        })
    }
}

module.exports = userMiddleware;