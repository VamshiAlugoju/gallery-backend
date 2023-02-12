const  express = require( "express");
const bodyParser =   require( "body-parser");
const mongoose = require("mongoose")
const fs = require("fs")
const dotenv = require("dotenv")
const  Placesroutes  = require( "./routes/places-routes");
const UserRoutes = require("./routes/users-routes")
const HttpError = require("./models/HttpError");
const path = require("path") ;

const app  = express()

app.use(bodyParser.json())

app.use("/uploads/images" , express.static(path.join("uploads","images")))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,DELETE,POST,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
  next()
})
 
app.use( "/api/Places", Placesroutes)
app.use("/api/users",UserRoutes)

app.use((req,res,next)=>{ 
    const err = new HttpError("404 Error")
    throw err
})
// gets called whenever an error occured in the above routes
app.use((error,req,res,next)=>{
     
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err)
    });
  }
    if(res.headerSent)
      {
        return next(error)
      }
      res.status(error.code || 500)
      res.json({message:error.message || "an unknown error occured"})
})
 
 const env =dotenv.config().parsed

mongoose
.connect(`mongodb+srv://${env.DBUSER}:${env.DBPASSWORD}@cluster0.lle7vij.mongodb.net/${env.DBNAME}?retryWrites=true&w=majority`)
.then(()=>
{
  app.listen(5000,()=>{console.log("connection started")})
 
})
.catch(err=>console.log(err))


