import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  let token = req.headers.token;

  // 🌐 Fallback to Authorization header
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log("🔐 [authMiddleware] Token received:", token);

  if (!token) {
    console.warn("❌ [authMiddleware] No token provided");
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ [authMiddleware] Token decoded:", token_decode);

    req.user = {
      id: token_decode.id,
      role: token_decode.role
};
    next();
  } catch (error) {
    console.error("❌ [authMiddleware] Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authMiddleware;
