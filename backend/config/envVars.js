import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
	MONGODB_URI: process.env.MONGODB_URI,
	PORT: process.env.PORT || 5000,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	NODE_ENV: process.env.NODE_ENV,
	CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUD_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
