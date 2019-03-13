import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/config';

export const signup = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    hashed_password: bcrypt.hashSync(password, 10),
  });
  newUser.save()
    .then(user => res.status(200)
      .json({
        user: {
          id: user._id,
        },
      }))
    .catch(err => console.error(err));
};

export const signin = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400)
          .json({
            error: true,
            message: `Username \`${username}\` does not exist.`,
          });
      }
      if (!bcrypt.compareSync(password, user.hashed_password)) {
        return res.status(400)
          .json({
            error: true,
            message: 'Username and password do not match.',
          });
      }
      const token = jwt.sign({ user: user._id }, config.jwtSecret);
      res.cookie('token', token);
      return res.status(200)
        .json({
          token,
        });
    })
    .catch(err => console.error(err));
};

export const signout = (req, res) => {
  res.cookie('token', '');
  return res.status(200)
    .json({
      message: 'Logged out.',
    })
    .catch(err => console.error(err));
};

export default {
  signup,
  signin,
  signout,
};
