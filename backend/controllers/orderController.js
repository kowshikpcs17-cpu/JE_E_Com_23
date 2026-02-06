import HandleError from "../helper/handleError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

//Create new Order
export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

//Get  Single Order Deatils
export const getOrderDetails = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    return next(new HandleError("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
};

//Get All Order Deatils

export const getAllOrders = async (req, res, next) => {
  //console.log(req.user);
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("No Orders Found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

// Admin All Orders
export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  if (!orders) {
    return next(new HandleError("No Orders Found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// Admin Delete orders
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleError("Order not found", 404));
  }
  if (order.orderStatus !== "Delivered") {
    return next(
      new HandleError(
        "This Order is under Processing and cannot be deleted",
        403,
      ),
    );
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
};

//Admin Order Update
export const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;

  //const status = req.body.status;
  const order = await Order.findById(id);
  if (!order) {
    return next(new HandleError("Order Not found", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new HandleError("This Order is already been deliveres", 404));
  }

  //Update Stock
  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );

  order.orderStatus = req.body.status;
  if (Order.orderStatus === "Delivered") {
    order.deliveredAt = new Date();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
    message: "Order Status Updated Successfully",
  });
};

async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    return next(new HandleError("Product Not found", 404));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
