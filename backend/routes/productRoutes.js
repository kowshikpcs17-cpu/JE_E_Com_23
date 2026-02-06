import express from "express";
import {
  addProducts,
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getAllProducts,
  getAllProductsByAdmin,
  getSingleProduct,
  updateProduct,
  viewProductReviews,
} from "../controllers/productController.js";
import { authorizeRoles, verifyUser } from "../helper/useAuth.js";

const router = express.Router();

// Public(user) routes
router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);
//user reviews 
router.route("/review").put(verifyUser, createProductReview);

// Admin routes
router.route("/admin/product/create").post(verifyUser,authorizeRoles("admin"),addProducts);
router.route("/admin/product/:id").put(verifyUser,authorizeRoles("admin"),updateProduct).delete(verifyUser,authorizeRoles("admin"),deleteProduct);

// View Review
router.route("/admin/reviews").get(verifyUser, authorizeRoles("admin"), viewProductReviews);
// Admin  View All Products
router.route("/admin/products").get(verifyUser, authorizeRoles("admin"), getAllProductsByAdmin);
// Delete Review
router.route("/admin/review").delete(verifyUser, authorizeRoles("admin"), deleteProductReview);
export default router;
