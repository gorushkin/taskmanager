import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'There is no token' });
    const verified = jwt.verify(token, process.env.JWT);
    if (!verified) {
      return res.status(401).json({ message: 'Failde verification' });
    }
    res.status(200).json({ message: 'Auth is done!!!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default auth;
