import crypto from 'crypto';
// import bcrypt from 'bcryptjs';

const encrypt = (text) => {
  const hash = crypto.createHmac('sha512', 'salt');
  hash.update(text);
  return hash.digest('hex');
};

export default encrypt;

// const getHashPassword = (password) => {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// };
