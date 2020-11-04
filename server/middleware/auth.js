import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log('token: ', token);
    if (!token) return res.status(401).json({ message: 'There is no token' });
    const user = jwt.verify(token, process.env.JWT);
    if (!user) {
      return res.status(401).json({ message: 'Failde verification' });
    }
    console.log('user: ', user.email);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default auth;
