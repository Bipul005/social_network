const express= require("express")
const router= express.Router()
const{auth} = require("../middleware/auth")
const {
    followUser,
    unfollowUser
}= require("../controllers/Follow_Unfollow")

const{
    getLatestPostsFromFollowedUsers
}= require("../controllers/Follower_Post")

const{

    getFollowingList,
    getFollowersList
}= require("../controllers/Followers")
const{followeeId}= require("../controllers/Follow_Unfollow");
router.post("/followUser/:followeeId",auth, followUser)
router.post("/unfollowUser/:followeeId",auth, unfollowUser)
router.get("/getLatestPostsFromFollowedUsers",auth, getLatestPostsFromFollowedUsers)
router.get("/getFollowingList",auth, getFollowingList)
router.get("/getFollowersList",auth, getFollowersList)

module.exports = router;


