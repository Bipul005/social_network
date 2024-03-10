const Follow = require("../models/Follow");
const user= require("../models/User");

// Retrieve the list of users a given user is following
exports.getFollowingList = async (req, res) => {
    try {
        const followerId = req.user._id; // Assuming user information is available in the request

        const followingList = await Follow.find({ followerId })
            .populate('followeeId', 'firstName lastName') // Assuming user details are in the "User" model
            .exec();

        res.json({
            success: true,
            data: latestPosts,
            message: " following list get  successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while fetching following list",
        });
    }
};

// Retrieve the list of users who are following a given user
exports.getFollowersList = async (req, res) => {
    try {
        const followeeId = req.user._id; // Assuming user information is available in the request

        const followersList = await Follow.find({ followeeId })
            .populate('followerId', 'firstName lastName') // Assuming user details are in the "User" model
            .exec();

        res.json({
            success: true,
            data: latestPosts,
            message: " follower list get  successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while fetching followers list",
        });
    }
};
