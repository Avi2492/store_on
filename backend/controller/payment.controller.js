export async function createCheckoutSession(req, res) {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Problem in Creating Checkout" + error.message,
    });
  }
}

export async function checkoutSuccess(req, res) {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Problem in Checkout Success" + error.message,
    });
  }
}
