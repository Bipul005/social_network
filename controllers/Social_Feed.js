const mongoose = require('mongoose');
const Post = require('../models/Post');
const Follow = require('../models/Follow');

// Retrieve social feed
exports.getSocialFeed = async (req, res) => {
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
};
