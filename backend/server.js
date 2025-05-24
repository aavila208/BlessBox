import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ✅ GLOBAL REQUEST LOGGER (Add This)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  next();
});


// --- CORS MIDDLEWARE (put this BEFORE routes!) ---
app.use(cors({
  origin: [
    'https://bless-box.vercel.app', // <-- your deployed frontend!
    'http://localhost:5173'         // <-- local dev frontend
  ],
  credentials: true
}));

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 4000;

// --- OTHER MIDDLEWARE ---
app.use(express.json());

// --- DB CONNECTION ---
connectDB();

// --- API ROUTES ---
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads')); // Serve uploaded images
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// --- TEST ROUTE ---
app.get("/", (req, res) => {
  res.send("API Working");
});

// --- SERVE REACT FRONTEND (build) ---
// Serve static files from React app build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all: send back React's index.html for any route not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
