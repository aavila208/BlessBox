import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {
    console.log("📥 addFood called");
    console.log("🖼️ Uploaded file:", req.file);        // ADD THIS
    console.log("📦 Request body:", req.body);         // ADD THIS
    
    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    console.log('removeFood endpoint HIT!', req.body);
    try {
        console.log('removeFood called with req.body:', req.body);
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.error('Error in removeFood:', error.stack || error);
        res.json({ success: false, message: error.message || "Error" });
    }    

}

export { listFood, addFood, removeFood }