const adminOnly = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Hanya dapat diakses oleh admin' });
  }
};

module.exports = adminOnly;
