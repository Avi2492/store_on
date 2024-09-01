import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

export const connectToMongoDB = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }
  try {
    await mongoose.connect(ENV_VARS.MONGODB_URI, {
      dbName: "mystore",
      bufferCommands: true,
    });
    console.log(`Db Connected Success!`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    throw new Error("Error: ", error);
    // process.exit(1);
  }
};
