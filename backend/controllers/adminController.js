// backend/controllers/adminController.js

// UPDATE: Example placeholder function
import userModel from "../models/userModel.js";

// Get all users (for admin panel)
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password"); // Exclude passwords
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Delete a user by ID (for admin panel)
export const deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    await userModel.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};
