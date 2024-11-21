import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.accessToken;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized - No Token Provided" });
		}

		try {
			const decoded = jwt.verify(token, ENV_VARS.ACCESS_TOKEN_SECRET);

			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User Not Found!" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res
					.status(401)
					.json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Error in ProtectRoute" + error.message,
		});
	}
};

export const adminRoute = async (req, res, next) => {
	try {
		if (req.user && req.user.role === "admin") {
			next();
		} else {
			return res.status(403).json({ message: "Access denied - Admin only" });
		}
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Error in AdminRoute" + error.message,
		});
	}
};
