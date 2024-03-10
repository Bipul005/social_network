const express= require("express")
const router= express.Router()
const { auth} = require("../middleware/auth")
const {
    updateProfile ,
    getAllUserDetails ,
    deleteAccount,
    updateDisplayPicture,
} = require("../controllers/Profile")

router.put("/updateProfile",auth, updateProfile )
router.get("/getAllUserDetails",auth, getAllUserDetails)
router.put("/updateDisplayPicture",auth, updateDisplayPicture)
router.delete("/deleteAccount",auth, deleteAccount)

module.exports = router;