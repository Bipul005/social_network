const mongoose = require('mongoose');

// Define the Follow schema using the Mongoose Schema constructor
const followSchema = new mongoose.Schema(
    {
        // The user who is following
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming your user model is named 'User'
            required: true,
        },

        // The user who is being followed
        followeeId: {
           type: mongoose.Schema.Types.ObjectId,
           // type:String,
            ref: 'User', // Assuming your user model is named 'User'
            required: true,
        },
    },
    { timestamps: true }
);

// Define a unique compound index to ensure a user can only follow another user once
followSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

// Export the Mongoose model for the follow schema, using the name "Follow"
module.exports = mongoose.model('Follow', followSchema);
