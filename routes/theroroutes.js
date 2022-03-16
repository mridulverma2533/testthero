const router=require("express").Router();
const auth = require("../middleware/auth").authCustomer

const controller = require("../controller/therocontroller")


router.post("/login",controller.signup)

router.post("/saveuser" ,auth,controller.saveuser)
router.get("/getuser",auth,controller.getuser)
router.post("/savegamestate",auth,controller.addgamestate)
router.get("/getgamestate",auth,controller.getgamestate)








module.exports=router;