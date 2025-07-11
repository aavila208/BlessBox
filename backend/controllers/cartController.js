import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.user.id);
      // UPDATE: Check if userData is null
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }
      //-----
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.user.id, {cartData});
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.user.id);
      // UPDATE: Check if userData is null
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }
      //-----
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.user.id, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.user.id); // <-- Changed to req.user.id
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }
      let cartData = userData.cartData;
      res.json({ success: true, cartData: cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }