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

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod }

// [Second]
export const updateComment = async (req, res) => {
    const { id, comment } = req.body;
    try {
      await Order.findByIdAndUpdate(id, { comment });
      res.send({ success: true, message: "Comment updated" });
    } catch (error) {
      res.status(500).send({ success: false, message: "Failed to update comment" });
    }
  }