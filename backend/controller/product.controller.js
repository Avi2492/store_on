import cloudinary from "../lib/cloudinary.js";
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

export async function createProduct(req, res) {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in Featured Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400).json({ success: false, message: "Product not Found!" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error in deleting image from cloudinary" });
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Product Deleted Success!" });
  } catch (error) {
    console.log("Error in Delete Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function getRecommendedProducts(req, res) {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in Recommend Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function getProductsByCategory(req, res) {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res
      .status(200)
      .json({ success: true, message: "Category found", data: { products } });
  } catch (error) {
    console.log("Error in Category Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function toggleFeaturdProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();

      await updateFeatureProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not Found!" });
    }
  } catch (error) {
    console.log("Error in Toggle feature Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}

async function updateFeatureProductsCache() {
  try {
    // Lean method is used to return plain js objects instead of full mongoose documents.This can significantly improve performance
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in Update feature Products controller", error.message);
    res.status(404).json({ success: false, message: error.message });
  }
}
