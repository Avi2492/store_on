import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controller/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySalesData,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      status: 400,
      message: "Something Went Wrong in Analytics " + error.message,
    });
  }
});

export default router;
