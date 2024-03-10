    const express= require("express")
    const router= express.Router()


   const {
    createPost,
    getUserPost,
    updatePost,
    deletePost,
   } = require("../controllers/Post")


    router.post("/createPost", createPost)
    router.get("/getUserPost", getUserPost)
    router.put("/updatePost/:postId", updatePost)

    router.delete("/deletePost/:postId", deletePost)

    module.exports = router;