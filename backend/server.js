// import express  from "express"
// import cors from 'cors'
// import { connectDB } from "./config/db.js"
// import userRouter from "./routes/userRoute.js"
// import foodRouter from "./routes/foodRoute.js"
// import 'dotenv/config'
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"
// import adminRouter from "./routes/adminRoute.js" // UPDATE: Importing adminRouter

// //
// import path from 'path';
// import { fileURLToPath } from 'url';
// //
// // These two lines are needed to use __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'build'))); // Use 'dist' if Vite

// // The "catchall" handler: for any request that doesn't match above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html')); // Use 'dist' if Vite
// });

// // app config
// const app = express()
// const port = process.env.PORT || 4000;


// // middlewares
// app.use(express.json())
// app.use(cors())

// // db connection
// connectDB()

// // api endpoints
// app.use("/api/user", userRouter)
// app.use("/api/food", foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/api/cart", cartRouter)
// app.use("/api/order",orderRouter)
// app.use("/api/admin", adminRouter) // UPDATE: Using adminRouter for admin routes

// app.get("/", (req, res) => {
//     res.send("API Working")
//   });



// app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
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

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// --- CORS MIDDLEWARE (put this BEFORE routes!) ---
app.use(cors({
  origin: [
    'https://blessbox.onrender.com', // <-- your deployed frontend
    'http://localhost:5173'             // <-- keep for local dev
  ],
  credentials: true
}));


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
