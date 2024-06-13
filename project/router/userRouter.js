const {Router}=require("express")
 const{ signUp, loginUser, logout}=require("../controller/userController")

 const router=Router()

 router.post("/signup",signUp)
  router.post("/login",loginUser)
  router.post("/logout",logout)

module.exports = router;


