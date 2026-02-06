import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersByAdmin,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authorizeRoles, verifyUser } from "../helper/useAuth.js";

const router = express.Router();

router.route("/new/order").post(verifyUser, createNewOrder);
router.route("/order/:id").get(verifyUser, getOrderDetails);
router.route("/orders/user").get(verifyUser, getAllOrders);

//Admin
router
  .route("/admin/orders")
  .get(verifyUser, authorizeRoles("admin"), getAllOrdersByAdmin);
router
  .route("/admin/order/:id")
  .delete(verifyUser, authorizeRoles("admin"), deleteOrder);
router
  .route("/admin/order/:id")
  .put(verifyUser, authorizeRoles("admin"), updateOrderStatus);
//router.post("/new/order",createNewOrder);

export default router;
