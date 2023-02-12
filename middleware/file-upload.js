 const multer = require("multer")
const { v4 } = require("uuid")
 const {uuid} = require("uuidv4")
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
}

//multer is node module that helps to take images or files to our backend
const fileupload =multer({

     limits:500000,
     storage:multer.diskStorage({
        destination:(req,file,cb)=>{
             cb(null,"uploads/images")
        },
        filename:(req,file,cb)=>{
            const ext = MIME_TYPE_MAP[file.mimetype]
            cb(null,v4()+"."+ext)
        
        }

     }),
     fileFilter:(req,file,cb)=>{
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        const error = isValid ? null : new Error("invalid mime type");
        cb(error,isValid)
     }

})

module.exports = fileupload