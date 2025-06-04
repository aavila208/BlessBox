// UPDATE: This is the admin route file that handles user management
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import { getUsers, deleteUser } from '../controllers/adminController.js';
import { createRequest, getAllRequests, deactivateRequest } from '../controllers/requestController.js';

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, isAdmin, getUsers);
adminRouter.post("/delete-user", authMiddleware, isAdmin, deleteUser);

export default adminRouter;