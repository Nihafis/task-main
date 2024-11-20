import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../util/error.js';
import User from '../model/userModel.js';

const signToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const signup = async (req, res, next) => {

  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(402).send('All fields are required.')
  }
  if (password !== confirmPassword) {
    return res.status(402).send('Passwords do not match')
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = {
    username,
    password: hashPassword
  }

  try {
    await User.signUp(newUser, (err, result) => {
      if (err) {
        if (err.errno === 1062) {
          return res.status(402).send('Username already exists')
        }
        return next(errorHandler(400, 'Failed to signup'));
      }
      if (result) {

        res.status(201).json({
          message: 'User signup successful',

        });
      }
    })

  } catch (err) {
    return next(err);
  }
};
export const login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('All fields are required.')
  }

  try {
    User.getUserbyUsername(username, (err, result) => {
      if (err) {
        next(errorHandler(400, 'Invalid username'));
        return res.status(400).send('Invalid username.')
      }


      if (!result) {
        next(errorHandler(400, 'User dose not exist. Please register.'));
        return res.status(400).send(' User dose not exist. Please register.')
      }
      const isMatch = bcryptjs.compareSync(password, result.password);
      if (!isMatch) {
        next(errorHandler(400, 'Invalid password'));
        return res.status(400).send('Invalid password.')

      }

      const token = signToken(result.username);
      res
        .status(200)
        .cookie("jwt", token, { httpOnly: false })
        .json({
          message: 'User login successful',
          token
        });

    })
  } catch (err) {
    return next(err);

  }
}

export const loginWithGoogle = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(402).send('All fields are required.')
  }
  const generatedPassword =
    Math.random().toString(36).slice(-8) +
    Math.random().toString(36).slice(-8);
  const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  const newUser = {
    username,
    password: hashedPassword
  }
  User.getUserbyUsername(newUser.username, async (err, result) => {

    if (!result) {
      try {
        await User.signUp(newUser, (err, result) => {
          if (err) {
            if (err.errno === 1062) {
              return res.status(402).send('Username already exists')
            }
            return next(errorHandler(400, 'Failed to signup'));
          }
        })
      } catch (err) {
        return next(err);
      }
    }

    const token = signToken(newUser.username);
    res
      .status(200)
      .cookie("jwt", token, { httpOnly: false })
      .json({
        message: 'User login successful',
        token
      });

  })




}

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Logged out successfully' });
}
