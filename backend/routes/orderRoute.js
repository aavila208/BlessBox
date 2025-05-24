import express from 'express';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js'; // UPDATE: Importing isAdmin middleware
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod, updateComment } from '../controllers/orderController.js'; // [Third]

const orderRouter = express.Router();

// Adming-only routes
orderRouter.get("/list", authMiddleware, isAdmin, listOrders); // UPDATE: List all orders

// Regular user routes
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);

// Admin-only routes
orderRouter.post("/status",authMiddleware, isAdmin, updateStatus); // UPDATE: Update order status   

// Public route (payment verification)
orderRouter.post("/verify",verifyOrder);

// Admin-only route (comment)
orderRouter.post("/update-comment", (req, res, next) => {
  console.log("🔥 NO AUTH - hit /update-comment");
  next();
}, updateComment);



export default orderRouter;