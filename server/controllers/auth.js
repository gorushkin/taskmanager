import encrypt from '../encrypt.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  console.log('login');
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (encrypt(password) === user.password) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT,
        { expiresIn: 3600 }
      );
      res
        .status(200)
        .json({
          user,
          token: `Bearer ${token}`,
          message: 'autorisation is success!!!',
        })
        .end();
    } else {
      res.status(403).json({ message: 'Wrong passwod!' });
    }
  } else {
    res.status(403).json({ message: 'There is no user with this email' }).end();
  }
};

const register = async (req, res) => {
  console.log('register');
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    res
      .status(409)
      .json({
        message: 'not unique user email',
      })
      .end();
  }
  const hash = encrypt(password);
  const user = new User({ email, password: hash });
  try {
    await user.save();
    res
      .status(201)
      .json({
        user: {
          user: user.email,
          id: user._id,
        },
        message: 'use created',
      })
      .end();
  } catch (error) {}
};

export { login, register };
