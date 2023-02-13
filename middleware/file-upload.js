 const multer = require("multer")
const { v4 } = require("uuid")
 const {uuid} = require("uuidv4")
 const {S3} = require("aws-sdk")
 const dotenv = require("dotenv")
  const fs = require("fs")
 const env = dotenv.config().parsed
 const bucket = env.AWS_BUCKET_NAME
 const accesskey = env.AWS_ACCESS_KEY
 const secretkey  =env.AWS_SECRET_KEY
 const region = env.AWS_BUCKET_REGION


 const s3 = new S3({
    region,
    accesskey,
    secretkey
 })
const MIME_TYPE_MAP = {
    'image/png':'png', 
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
}

  function uploads(file)
  {  
     
    const fileStream = fs.createReadStream(file.path)

    const uploadparams={
        Bucket : bucket,
        Body:fileStream,
        Key:file.filename
    }

    return s3.upload(uploadparams).promise()
  }

  function downloadfile(filekey){
  
       const downloadParams= {
        Key:filekey,
        Bucket:bucket
       }
       return  s3.getObject(downloadParams).createReadStream()
  }

  function deletefile(filekey){
       
    console.log(filekey)
    const deleteparams={
      Key:filekey,
      Bucket:bucket
    }

    return s3.deleteObject(deleteparams).promise()
  }

//multer is node module that helps to take images or files to our backend
// const fileupload =multer({

//      limits:500000,
//      storage:multer.diskStorage({
//         destination:(req,file,cb)=>{
//              cb(null,"uploads/images")
//         },
//         filename:(req,file,cb)=>{
//             const ext = MIME_TYPE_MAP[file.mimetype]
//             cb(null,v4()+"."+ext)
//         }

//      }),
//      fileFilter:(req,file,cb)=>{
//         const isValid = !!MIME_TYPE_MAP[file.mimetype]
//         const error = isValid ? null : new Error("invalid mime type");
//         cb(error,isValid)
//      }

// })

// exports.fileupload = fileupload
exports.uploads = uploads
exports.downloadfile = downloadfile
exports.deletefile = deletefile