import HandleError from "./handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Verify User Middleware
export const verifyUser = async (req,res,next) => {
    const { token } = req.cookies;
    //console.log(token);
    if (!token) {
        return next(new HandleError("Please login to access this resource",401));
    }
    const decodedData = await jwt.verify(token,process.env.JWT_SECRET);
    //console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();

};

//
export const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {           
            return next(new HandleError(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }   ;
};  
