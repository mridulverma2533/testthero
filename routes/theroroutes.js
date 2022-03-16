const router=require("express").Router();
const auth = require("../middleware/auth").authCustomer

const controller = require("../controller/therocontroller")


router.post("/loginuser",controller.signup)

router.post("/adduser" ,auth,controller.saveuser)
router.get("/getadduser",auth,controller.getuser)
router.post("/addgamestate",auth,controller.addgamestate)
router.get("/getaddgamestate",auth,controller.getgamestate)








module.exports=router;