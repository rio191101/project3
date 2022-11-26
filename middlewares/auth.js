const { User } = require('../models');
const jwtHelper = require('../helpers/jwtHelper');

const auth = async (req, res, next) => {
  try {
    const token = req.headers['token'];
    if (!token) {
      return res.status(401).json({ message: 'memerlukan token header' });
    }
    const { id, role } = jwtHelper.verify(token);
    if (!id || !role) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(401).json({ message: 'Tidak dapat menemukan akun' });
    }
    req.user = { id, role };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
