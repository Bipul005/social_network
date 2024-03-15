const Follow = require("../models/Follow");
const User= require("../models/User");

// Retrieve the list of users a given user is following
exports.getFollowingList = async (req, res) => {
   // try {

        /*
        const followerId = req.body; // Assuming user information is available in the request

        const followingList = await User.find({ following })
           // .populate('followeeId', 'firstName lastName') // Assuming user details are in the "User" model
           // .exec();
        console.log(followingList);
        res.json({
            success: true,
            data: followingList,
            message: " following list get  successfully"
        });
        */


        console.log("start")
        const {userId}=req.params
        console.log(userId);
        try{
            const user=await User.findById(userId).populate("following","firstName lastName")
            console.log(user)

            if(!user){
                return res.status(400).json({
                    error: "user not found ",
                });
            }
    
          //  const {followingList,...data}=user

            res.json({
                success: true,
                data: user,
                message: " following list get  successfully"
            });
    
    }
      catch (err)
      {
        return res.status(400).json({
            error: "Error while fetching following list",
        });
      }
};

// Retrieve the list of users who are following a given user
exports.getFollowersList = async (req, res) => {
    console.log("start")
        const {userId}=req.params
        console.log(userId);
        try{
            const user=await User.findById(userId).populate("followers","firstName lastName")
            console.log(user)

            if(!user){
                return res.status(400).json({
                    error: "user not found ",
                });
            }
    
           // const {followerList,...data}=user

            res.json({
                success: true,
                data: user,
                message: " follower list get  successfully"
            });
    
    }
      catch (err)
      {
        return res.status(400).json({
            error: "Error while fetching follower list",
        });
      }
};
