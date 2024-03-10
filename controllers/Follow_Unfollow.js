const Follow = require("../models/Follow");
const User= require("../models/User");
const mongoose = require('mongoose');

// followuser
exports.followUser = async (req, res) => {
    try {
        const followerId = req.user ? req.user._id : null;
        const followeeId = req.params.followeeId;

        console.log("Followee ID:", followeeId);

        const usertoFollow = await User.findById(followeeId);

        if (!usertoFollow) {
            return res.status(404).json({
                success: false,
                message: "User to follow not found",
            });
        }

        const existingFollow = await Follow.findOne({ followerId, followeeId });
        if (existingFollow) {
            return res.status(400).json({
                error: "User is already being followed",
            });
        }

        // Convert followeeId to ObjectId
        const followeeObjectId =  mongoose.Types.ObjectId(followeeId);

        const follow = new Follow({ followerId, followeeId: followeeObjectId });
        const savedFollow = await follow.save();

        const followerUser = await User.findById(followerId);
        const followeeUser = await User.findById(followeeObjectId);

        if (!followerUser || !followeeUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        followeeUser.followerId.push(followerUser._id);
        await followeeUser.save();

        followerUser.followeeId.push(usertoFollow._id);
        await followerUser.save();

        res.json({
            follow: savedFollow,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: "Error while following user",
        });
    }
};








// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const followerId = req.user._id; // Assuming user information is available in the request
        const { followeeId } = req.body;

        // Check if the user is not trying to unfollow themselves
        if (followerId.equals(followeeId)) {
            return res.status(400).json({
                error: "Cannot unfollow yourself",
            });
        }

        // Check if the user is currently following the target user
        const existingFollow = await Follow.findOne({ followerId, followeeId });
        if (!existingFollow) {
            return res.status(400).json({
                error: "User is not being followed",
            });
        }

        await existingFollow.remove();

        res.json({
            message: "User unfollowed successfully",
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while unfollowing user",
        });
    }
};
