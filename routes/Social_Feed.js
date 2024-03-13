const express= require("express")
const router= express.Router()
const { auth }= require("../middleware/auth")
const {getSocialFeed}= require("../controllers/Social_Feed")
router.get("/getSocialFeed",auth,getSocialFeed)

module.exports = router;