const requireRole = (role) => (req, res, next) => {
  if (req.userRole !== role) {
    return res.status(403).json({ message: `Only ${role}s can perform this action` });
  }
  next();
};

export default requireRole;
