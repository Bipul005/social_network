const Follow = require("../models/Follow");
const User= require("../models/User");
const Post=require("../models/Post");

exports.getLatestPostsFromFollowedUsers = async (req, res) => {
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
};
