// UPDATE: This middleware checks if the user has admin privileges
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Admin access required" 
      });
    }
    next();
  };
  
  export default isAdmin;
  