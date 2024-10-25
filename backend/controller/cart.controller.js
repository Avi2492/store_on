import Product from "../models/product.models.js";

export async function getCartProducts(req, res) {
  try {
    const products = await Product.find({
      _id: {
        $in: req.user.cartItems,
      },
    });

    // Add quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong in Get cart" + error.message,
    });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong in Add to cart" + error.message,
    });
  }
}

export async function removefromCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong in Remove cart" + error.message,
    });
  }
}

export async function updateQuantity(req, res) {
  try {
    const { id: productId } = req.params;

    const { quantity } = req.body;

    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res
        .status(404)
        .json({ success: false, message: "Items not found in Cart" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something wrong in Update cart" + error.message,
    });
  }
}
