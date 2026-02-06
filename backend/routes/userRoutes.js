import exprees from "express";
import { deleteUser, forgotPassword, getAllUsers, getSingleUser, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole, userProfile } from "../controllers/userControler.js";
import { authorizeRoles, verifyUser } from "../helper/useAuth.js";

const router = exprees.Router();

// Public(user) routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);  
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(verifyUser, userProfile);
router.route("/password/update").put(verifyUser, updatePassword);
router.route("/profile/update").post(verifyUser, updateProfile);

// Admin routes
router.route("/admin/users").get(verifyUser,authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(verifyUser,authorizeRoles("admin"), getSingleUser);
router.route("/admin/user/:id").put(verifyUser,authorizeRoles("admin"), updateUserRole);
router.route("/admin/user/:id").delete(verifyUser,authorizeRoles("admin"), deleteUser);


    
export default router;


