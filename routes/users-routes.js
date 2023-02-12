const  express = require("express");
const router  = express.Router();
const {check} = require("express-validator")
const fileupload = require("../middleware/file-upload")
const UserControllers = require("../controllers/user-controllers.js")



router.get("/" , UserControllers.getallUsers)

router.post("/signUp",  
      fileupload.single("image"),
[
    check("id").not().isEmpty(),
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("Password").isLength({min:8})
],UserControllers.signUp)

router.post("/login",[
    
    check("email").not().isEmpty(),
    check("password").not().isEmpty()
],UserControllers.Login)

module.exports = router