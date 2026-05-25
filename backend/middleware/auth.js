const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

  const token =
    req.header("Authorization");

  if(!token){

    return res.status(401).json({
      message:"No token"
    });

  }

  try{

    const realToken =
      token.replace("Bearer ","");

    const decoded =
      jwt.verify(
        realToken,
        process.env.JWT_SECRET
      );

    req.user = {

      id:decoded.id,

      username:decoded.username

    };

    next();

  }catch(error){

    console.log(error);

    res.status(401).json({
      message:"Token Invalid"
    });

  }

};