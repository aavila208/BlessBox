import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Placing User Order for Frontend using stripe
const placeOrderCod = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

// [Second]
const updateComment = async (req, res) => {
    const { id, comment } = req.body;
  
    console.log("💬 [updateComment] Payload received:", { id, comment });
  
    // Validate input
    if (!id || typeof comment !== "string") {
      console.error("❗ Invalid payload", { id, comment });
      return res.status(400).json({ success: false, message: "Invalid input" });
    }
  
    try {
      console.log("🔎 Looking for order:", id);
      const result = await orderModel.findByIdAndUpdate(
        id,
        { $set: { comment } }, // USE $set explicitly
        { new: true, runValidators: true }
      );
  
      console.log("📬 [updateComment] DB update result:", result);
  
      if (!result) {
        console.warn("⚠️ Order not found:", id);
        return res.status(404).json({ success: false, message: "Order not found or update failed" });
      }
  
      console.log("✅ [updateComment] Success for order:", id);
      res.json({ success: true, message: "Comment updated", data: result });
  
    } catch (error) {
      console.error("❌ [updateComment] Server error:", error);
      res.status(500).json({ success: false, message: "Failed to update comment", error: error.message });
    }
  };    

// ✅ export everything together
export {
  placeOrder,
  placeOrderCod,
  listOrders,
  userOrders,
  updateStatus,
  verifyOrder,
  updateComment,
};