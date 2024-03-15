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
router.post("/followUser/:userId",auth, followUser)
router.post("/unfollowUser/:userId",auth, unfollowUser)
router.get("/getLatestPostsFromFollowedUsers/:userId",auth, getLatestPostsFromFollowedUsers)
router.get("/getFollowingList/:userId",auth, getFollowingList)
router.get("/getFollowersList/:userId",auth, getFollowersList)

module.exports = router;



