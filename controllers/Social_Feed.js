const mongoose = require('mongoose');
const Post = require('../models/Post');
const Follow = require('../models/Follow');

// Retrieve social feed
exports.getSocialFeed = async (req, res) => {

  /*
  try {
    const userId = req.user.id; // Assuming user information is available in the request

    const socialFeed = await Follow.aggregate([
      {
        $match: { followerId: mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'Post', // Assuming your posts collection is named 'Post'
          localField: 'followeeId',
          foreignField: 'userId',
          as: 'followeePosts',
        },
      },
      {
        $unwind: '$followeePosts',
      },
      {
        $sort: { 'followeePosts.createdAt': -1 },
      },
      {
        $group: {
          _id: '$followeePosts._id',
          title: { $first: '$followeePosts.title' },
          body: { $first: '$followeePosts.body' },
          userId: { $first: '$followeePosts.userId' },
          createdAt: { $first: '$followeePosts.createdAt' },
        },
      },
      {
        $project: {
          _id: 0,
          postId: '$_id',
          title: 1,
          body: 1,
          userId: 1,
          createdAt: 1,
        },
      },
    ]);

    res.json({
      data: socialFeed,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
  */

  const userId = req.params.userId; // Assuming you have the userId
try {
    const posts = await Post.aggregate([
        // Match users whom the current user is following
        {
            $match: {
                userId: userId // User whose posts to fetch
            }
        },
        // Lookup for posts by users whom the current user is following
        {
            $lookup: {
                from: "User", // Assuming your collection name is "posts"
                localField: "following", // Field containing the users followed by the current user
                foreignField: "userId", // Field in the "posts" collection containing the user's ID
                as: "Posts" // Alias for the matched posts
            }
        },
        // Unwind the array of posts
        {
            $unwind: "$Posts"
        },
        // Sort the posts by creation date in descending order (most recent first)
        {
            $sort: {
                "followedPosts.createdAt": -1
            }
        }
    ]);

    res.json(posts);
} catch (err) {
    console.error(err);
    return res.status(500).json({
        error: "Internal server error"
    });
}

};
