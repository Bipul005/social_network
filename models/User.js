const mongoose = require("mongoose");
 const { v4: uuidv4 } = require("uuid");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{

		/*
		// Use UUID for the _id field
		_id: {
			type: String,
			default: uuidv4,
		},
			*/
		// Other fields remain unchanged
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		post:[{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Post",
		}],
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Profile",
		},
		
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
		},
		followers:[{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User",
			default: [],
		}],
		following:[{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User",
			default: [],
		}],
		
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema);
