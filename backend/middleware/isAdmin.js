const isAdmin = (req, res, next) => {
  console.log("👮 [isAdmin] Checking role for:", req.user);

  if (!req.user) {
    console.log("❌ isAdmin: req.user is missing");
    return res.status(403).json({ success: false, message: "No user attached to request" });
  }

  console.log("🔍 isAdmin: user role =", req.user.role);

  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }

  next();
};

export default isAdmin;
