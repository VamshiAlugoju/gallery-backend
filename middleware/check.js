 const HttpError = require("../models/HttpError.js")
 const jwt = require("jsonwebtoken")

 module.exports = (req,res,next)=>{
      
    if(req.method === "OPTIONS")
    {
        return next()
    }
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
               throw new Error("authorization failed")
        }
       const decodedToken = jwt.verify(token,"super_secret_key") ;
       req.userData ={userId : decodedToken.userId}
       next()
    }catch(err){
           return next(new HttpError("authoraization failed please check password",401))
    }


 }