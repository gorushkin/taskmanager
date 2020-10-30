import _ from 'lodash';
import state from '../state/index.js';

const auth = (req, res) => {
  const { email, password } = req.body;
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

export default auth;
