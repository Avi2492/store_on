import Coupon from "../models/coupon.models";

export async function getCoupon(req, res) {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });

    req.json(coupon || null);
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong in get Coupon" + error.message,
      success: false,
    });
  }
}

export async function validateCoupon(req, res) {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "Coupon Not Found!", success: false });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ message: "Coupon is Expired" });
    }

    res.json({
      message: "Coupon is Valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong in Validating Coupon" + error.message,
      success: false,
    });
  }
}
