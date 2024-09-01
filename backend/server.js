import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";

const app = express();

const PORT = ENV_VARS.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "MyStore Test API is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  connectToMongoDB();
});
