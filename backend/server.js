import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "./route/auth.route.js";
import productRoutes from "./route/product.route.js";
import cartRoutes from "./route/cart.route.js";
import couponRoutes from "./route/coupon.route.js";
// import paymentRoutes from "./route/payment.route.js";
import analyticsRoutes from "./route/analytics.route.js";

const app = express();

const PORT = ENV_VARS.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupons", couponRoutes);
// app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "MyStore Test API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToMongoDB();
});
