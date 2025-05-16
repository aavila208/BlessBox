import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;


    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ authMiddleware passed — user:", token_decode); // ADD THIS
    
        req.user = {
            id: token_decode.id,
            role: token_decode.role
        };
        next();
    } catch (error) {
        console.log("❌ authMiddleware error:", error.message); // ADD THIS
        return res.json({ success: false, message: error.message });
    }
}

export default authMiddleware;