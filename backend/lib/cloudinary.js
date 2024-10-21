import { v2 as cloudinary } from "cloudinary";
import { ENV_VARS } from "../config/envVars";

cloudinary.config({
  cloud_name: ENV_VARS.CLOUD_NAME,
  api_key: ENV_VARS.CLOUD_API_KEY,
  api_secret: ENV_VARS.CLOUD_API_SECRET,
});

export default cloudinary;
