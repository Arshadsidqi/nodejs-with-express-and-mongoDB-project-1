const {Router}=require("express")
const { createQuot, fetchall, updateOne, deleteOne } = require("../controller/quoteController")
// const { updateOne } = require("../controller/quoteController")
const router=Router()
router.post("/quotecreate",createQuot)
router.get("/fetchall",fetchall)
router.patch("/updateOne/:id",updateOne)
router.delete("/deleteOne/:id",deleteOne)
module.exports=router;
