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
import requestRouter from "./routes/requestsRoute.js";
import { fileURLToPath } from "url";

const app = express();

console.log(">>> Running in", process.env.NODE_ENV || "no NODE_ENV set");
console.log(">>> PORT:", process.env.PORT);
console.log(">>> MONGODB_URI:", process.env.MONGODB_URI);

// ✅ GLOBAL REQUEST LOGGER (Add This)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  next();
});


// --- CORS MIDDLEWARE (put this BEFORE routes!) ---
app.use(cors({
  origin: [
      "https://bless-box.vercel.app",                            // your original prod URL
      "https://bless-b1h8hxynn-aavila208s-projects.vercel.app",   // first preview you used
      "https://bless-r7dippkfj-aavila208s-projects.vercel.app",   // this new preview URL
      "http://localhost:5173"                                     // local dev
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
app.use("/images", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// ─── Mount “requests” all in one place ───
app.use("/api/requests", requestRouter);

// --- TEST ROUTE ---
app.get("/", (req, res) => {
  res.send("API Working");
});

// --- SERVE REACT FRONTEND (build) ---
// Serve Vite frontend build from ../frontend/dist
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// --- START SERVER ---
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
