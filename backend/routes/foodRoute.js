import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';  // UPDATE: to use authMiddleware
import isAdmin from '../middleware/isAdmin.js';  // UPDATE: to use isAdmin middleware

const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

// Public route (no auth needed)
foodRouter.get("/list",listFood);

// Admin-only routes UPDATE: Added authMiddleware and isAdmin middleware
foodRouter.post("/add", authMiddleware, isAdmin, upload.single('image'), addFood);
foodRouter.post("/remove", authMiddleware, isAdmin, removeFood);

export default foodRouter;