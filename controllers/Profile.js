//const Profile = require("../models/Profile");
const Profile= require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// Use the middleware
app.use(fileUpload());
// Method for updating a profile



exports.updateProfile = async (req, res) => {
	
	try {
		const { dateOfBirth =" ", bio=" ", contactNumber,firstName,lastName,gender } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		//const profileId=userDetails.additionalDetails
		const profile = await Profile.findById(userDetails.additionalDetails);
		//const profile = userDetails.additionalDetails ;


		// Update the profile fields
		userDetails.firstName = firstName || userDetails.firstName;
		User.lastName = lastName || User.lastName;
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.bio = bio || profile.bio;
		profile.gender=gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

		// Save the updated profile
		await profile.save();
		await userDetails.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			User
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};



/*

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user information is available in the request
    const { firstName, lastName, dateOfBirth, about, gender, contactNumber } = req.body;

    //const userDetails = await User.findById(userId).populate('additionalDetails').exec();
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const profile = userDetails.additionalDetails;

    // Update the profile fields
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.gender = gender || profile.gender;
    profile.contactNumber = contactNumber || profile.contactNumber;

    // Save the updated profile and user details
    await profile.save();
    await userDetails.save();

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      profile,
      userDetails,
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }

};
*/




// delete user
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete Associated Profile with the User
    const profileId = user.additionalDetails;
    if (profileId) {
      await Profile.findByIdAndDelete(profileId);
    }

    // Now Delete User
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'User cannot be deleted',
      error: error.message,
    });
  }
};



//view  user detail
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
	try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}
}

