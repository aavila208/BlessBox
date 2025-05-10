// backend/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

// import mongoose from "mongoose";

// export const  connectDB = async () =>{

//     await mongoose.connect('{ mongodb+srv://alexanderavila2028:qBDQRG5f2xU5t7Xc@blessbox.uq7sln8.mongodb.net/ }/BlessBox').then(()=>console.log("DB Connected"));
   
// }

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.