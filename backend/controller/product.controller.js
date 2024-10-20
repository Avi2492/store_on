import Product from "../models/product.models.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});

    console.log(products);

    if (!products) {
      res.status(404).json({ success: false, message: "No Products Found" });
    }

    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function getFeaturedProducts(req, res) {
  try {
    let featuredProducts = await Product.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
  } catch (error) {
    console.log("Error in Featured Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}
