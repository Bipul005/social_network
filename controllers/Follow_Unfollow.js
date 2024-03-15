const Follow = require("../models/Follow");
const User= require("../models/User");
const mongoose = require('mongoose');

// followuser
exports.followUser = async (req, res) => {
    try {
        const {_Id} = req.body;
        const {userId} = req.params;
    
        const usertoFollow = await User.findById(userId);
        const loggedinuser = await User.findById(_Id);
        console.log(usertoFollow);
        console.log("existing");
        console.log(loggedinuser);
        
        if (!usertoFollow) {
            return res.status(404).json({
                success: false,
                message: "User to follow not found",
            });
        }
    
        if (!loggedinuser) {
            return res.status(404).json({
                success: false,
                message: "Logged-in user not found",
            });
        }
    
        console.log("existing not");
    
        // Check if the loggedinuser is already following the user
        if ( loggedinuser.following.includes(userId)) {
            return res.status(400).json({
                error: "User is already being followed",
            });
        }
    
        loggedinuser.following.push(usertoFollow._id);
        usertoFollow.followers.push(loggedinuser._id);
    
        await loggedinuser.save();
        await usertoFollow.save();
    
        res.json({
            message: "User followed successfully",
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
    const {userId}=req.params
    const {_Id}=req.body

    try{
        if(userId===_Id){
            throw new CustomError("You can not unfollow yourself",500)
        }

        const userToUnfollow=await User.findById(userId)
        const loggedInUser=await User.findById(_Id)

      

        if(!userToUnfollow || !loggedInUser){
            throw new CustomError("User not found!",404)
        }

        if(!loggedInUser.following.includes(userId)){
            throw new CustomError("Not following this user",400)
        }

        loggedInUser.following=loggedInUser.following.filter(id=>id.toString()!==userId)
        userToUnfollow.followers=userToUnfollow.followers.filter(id=>id.toString()!==_Id)

        await loggedInUser.save()
        await userToUnfollow.save()

        res.status(200).json({message:"Successfully unfollowed user!"})

    } catch (err) {
        return res.status(400).json({
            error: "Error while unfollowing user",
        });
    }
};
