import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id, role) => { // UPDATE: Added role parameter
    return jwt.sign({id, role}, process.env.JWT_SECRET); // UPDATE: Include role in the token
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id, user.role) // UPDATE: Added user.role
        res.json({success:true,token, role: user.role}) // UPDATE: Send role to frontend
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id, user.role) // UPDATE: Added user.role
        res.json({success:true,token, role: user.role}) // UPDATE: Send role to frontend

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// USER TABLE 
const listUsers = async (req, res) => {
    console.log("👥 [listUsers] endpoint hit by user:", req.user); // ⬅️ log the incoming request
    try {
      const users = await userModel.find({}, '-password');
      res.json({ success: true, data: users });
    } catch (error) {
      console.error("❌ [listUsers] Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
  };

export {loginUser, registerUser, listUsers}