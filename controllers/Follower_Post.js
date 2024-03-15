const Follow = require("../models/Follow");
const User= require("../models/User");
const Post=require("../models/Post");

exports.getLatestPostsFromFollowedUsers = async (req, res) => {
    
    /*
    try {
        
        const userId = req.user._id; // Assuming user information is available in the request
        const followedUsers = await Follow.find({ followerId: userId });

        const followedUserIds = followedUsers.map(follow => follow.followeeId);

        const latestPosts = await Post.find({ userId: { $in: followedUserIds } })
            .sort({ createdAt: -1 })
            .limit(10); // You can adjust the limit as needed

        res.json({
            success: true,
            data: latestPosts,
            message: " latest post get  successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while fetching latest posts from followed users",
        });
    }
    */



    console.log("start")
    const {userId}=req.params
    console.log(userId);
    try{
        const user=await User.findById(userId).populate("following","Post").populate("Post")
        console.log(user)

        if(!user){
            return res.status(400).json({
                error: "user not found ",
            });
        }

        res.json({
            success: true,
            data: user,
            message: " latest post from following user get  successfully"
        });

}
  catch (err)
  {
    return res.status(400).json({
        error: "Error while fetching follower list",
    });
  }
};
