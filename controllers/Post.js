

const Post = require("../models/Post")

//Create post
exports.createPost = async (req, res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({title, body });
        const savedPost = await post.save();

        res.json({
            post : savedPost
        })
    }
    catch(err){
        return res.status(400).json({
            error : "Error While Creating Post"
        })
    }
}


//Read all post
exports.getUserPost = async (req, res) => {
    try{
        // const posts = await Post.find();
        //const posts = await Post.find().populate("likes").populate("comments").exec();
        const posts= await Post.find();
        res.json({
            data : posts,
        })
    }
    catch(err)
    {
        return res.status(400).json({
            error : "Error while Fetching Post "
        })
    }
}

// Update post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, body } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, body },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        res.json({
            post: updatedPost,
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while updating post",
        });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        res.json({
            message: "Post deleted successfully",
            post: deletedPost,
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while deleting post",
        });
    }
};










/*
const Post = require("../models/Post");
const user= require("../models/User");
// Create post
exports.createPost = async (req, res) => {
    try {
        const { textContent } = req.body;
        const userId = req.user._id; // Assuming user information is available in the request
        console.log("userid is " ,userId)
        const post = new Post({ textContent, userId });
        const savedPost = await post.save();

        
        return res.status(200).json({
			success: true,
            post: savedPost,
			message: "User posted successfully",
		});

    } catch (err) {
        return res.status(400).json({
            error: "Error While Creating Post",
        });
    }
};

// Read all posts of a specific user
exports.getUserPost = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user information is available in the request
        const userPosts = await Post.find({ userId });

        res.json({
            data: userPosts,
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while Fetching User Posts",
        });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { textContent } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { textContent },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        res.json({
            post: updatedPost,
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while updating post",
        });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        res.json({
            message: "Post deleted successfully",
            post: deletedPost,
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error while deleting post",
        });
    }
};



*/