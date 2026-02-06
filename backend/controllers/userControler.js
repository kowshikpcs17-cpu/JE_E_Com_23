import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js";
import { sendToken } from "../helper/jwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import crypto from "crypto";
import req from "express/lib/request.js";
import res from "express/lib/response.js";

// Register a user
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return next(new HandleError("Please provide name", 400));
  }
  if (!email) {
    return next(new HandleError("Please provide email ID", 400));
  }
  if (!password) {
    return next(new HandleError("Please provide password", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp_id",
      url: "temp_url",
    },
  });
  /*const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        user,
        token,
    });
    */
  sendToken(user, 201, res);
};

// Login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Please provide email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isValidPassword = await user.verifyPassword(password);
  if (!isValidPassword) {
    return next(new HandleError("Invalid email or password", 401));
  }

  /*const token = user.getJWTToken();
    res.status(200).json({success: true,user,token,});*/
  sendToken(user, 200, res);
};

// Logout user
export const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Reset password - send email
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User not found with this email", 400));
  }

  let resetToken;
  try {
    resetToken = user.getResetPasswordToken();
    await user.save();
    console.log(resetToken);
  } catch (error) {
    console.log(error);
    return next(
      new HandleError("Could not save rest token,Try agin later..", 500),
    );
  }

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIn this link expires in 30 minutes\n\nIf you have not requested this email then, please ignore it.`;
  const messageHTML = `<div style="font-family: sans-serif; font-size: 16px; color: #333;">
                            <h2 style="color: #007BFF;">Password Reset Request</h2>
                            <p>Your password reset token is:</p>
                            <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 15px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                            <p stlye="margin-top: 20px;">
                            or copy and paste the following link into your browser:</p>
                            <p style="word-break: break-all;">${resetPasswordUrl}</p>
                            <p>This link expires in 30 minutes.</p>
                            <p>If you did not request this email, please ignore it.</p>
                        </div>`;

  try {
    await sendEmail({
      email: user.email,
      subject: `JE_E_COMMERCE Password Recovery`,
      message,
      messageHTML: messageHTML,
    });
    res.status(200).json({
      success: true,
      message: `Reset password email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email could not be sent, Try again later..", 500),
    );
  }
  /*res.status(200).json({
        success: true,
        message: "Reset password email sent successfully",
        resetPasswordUrl,
    });*/
};

// Reset password - actual reset
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new HandleError(
        "Reset password token is invalid or has been expired",
        400,
      ),
    );
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

// Get user profile
export const userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// Update password
export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const isValidOldPassword = await user.verifyPassword(oldPassword);
  if (!isValidOldPassword) {
    return next(new HandleError("Old password is incorrect", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(new HandleError("New password does not match", 400));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );
  res.status(200).json({
    success: true,
    user,
  });
};

// Get all users -- Admin
export const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });

};

export const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);    
  if (!user) {
    return next(new HandleError(`User not found with id: ${req.params.id}`, 404));
  } 
  res.status(200).json({
    success: true,
    user,
  }); 
};

export const updateUserRole = async (req, res, next) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { 
      role
    },
    {
      new: true,    
      runValidators: true,
      useFindAndModify: false,
    },
  );    
  if (!user) {
    return next(new HandleError(`User not found with id: ${req.params.id}`, 404));
  } 
  res.status(200).json({
    success: true,
    user,
  }); 
};

// Delete user -- Admin
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError(`User not found with id: ${id}`, 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
