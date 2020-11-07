import encrypt from '../encrypt.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403).json({ message: 'No blank fields!!!' }).end();
  }
  try {
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
            user: {
              email: user.email,
              userId: user._id,
            },
            token,
            message: 'Autorisation is success!!!',
          })
          .end();
      } else {
        res.status(403).json({ message: 'Wrong passwod!' }).end();
      }
    } else {
      res.status(403).json({ message: 'There is no user with this email' }).end();
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'no connect' }).end();
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
        message: 'Not unique user email',
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
  } catch (error) {
    console.log(error);
  }
};

const getUserData = (req, res) => {
  console.log('getUserData');
  const token = req.header('Authorization');
  if (!token) {
    const user = {
      email: null,
      userId: null,
    };
    res.status(200).json({ message: 'there is no token', user }).end();
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT);
    res.status(200).json({ message: 'token', user }).end();
  } catch (error) {
    const user = {
      email: null,
      userId: null,
    };
    res.status(200).json({ message: error.message, user }).end();
  }
};

const logout = (req, res) => {
  console.log('logout');
  const user = {
    email: null,
    userId: null,
  };
  res.json({ message: 'logout', user }).end();
};

export { login, register, getUserData, logout };
