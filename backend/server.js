import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "./route/auth.route.js";
import productRoutes from "./route/product.route.js";

const app = express();

const PORT = ENV_VARS.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "MyStore Test API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToMongoDB();
});
