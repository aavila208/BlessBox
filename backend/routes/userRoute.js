import express from 'express';
import { loginUser,registerUser, listUsers} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const userRouter = express.Router();

userRouter.get("/list", authMiddleware, isAdmin, listUsers);
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;