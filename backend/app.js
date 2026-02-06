import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import Order from "./routes/orderRoutes.js";

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", Order);





//Middleware for Error
app.use(errorHandler);
export default app