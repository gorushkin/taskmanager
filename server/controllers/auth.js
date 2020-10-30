import _ from 'lodash';
import bcrypt from 'bcryptjs';
import state from '../state/index.js';
import User from '../models/User.js';

const login = (req, res) => {
  const { email, password } = req.body;
  console.log('email: ', email);
  const user = state.users[_.findIndex(state.users, { email })];
  if (user) {
    console.log('autorisation is success!!!');
    console.log('user: ', user);
    res.status(200).json({ user }).end();
  } else {
    console.log('wrong login or password!!!');
    res.status(403).end();
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
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User({ email, password: hashPassword });
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
