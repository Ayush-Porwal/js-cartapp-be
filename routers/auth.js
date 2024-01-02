import express from 'express';
import jwt from 'jsonwebtoken';

import Users from '../db/models/user.model.js';

const authRouter = express.Router();

authRouter.route('/signin').post(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ userEmail: email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (!user.comparePassword(password)) {
    res.status(401).json({ message: 'Incorrect password' });
    return;
  }

  const signinToken = jwt.sign(
    {
      _id: user._id,
      username: user.userName,
      email: user.userEmail,
      role: user.userRole,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  res.cookie('token', signinToken, {
    httpOnly: true,
    secure: true,
  });

  res.json({
    _id: user._id,
    role: user.userRole,
    email: user.userEmail,
    message: 'Signed in successfully',
  });
});

authRouter.route('/signup').post(async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await Users.findOne({ userEmail: email });
  if (user) {
    res.status(200).json({ message: 'User already exists' });
  } else {
    const newUser = await Users.create({
      userEmail: email,
      userName: username,
      userPassword: password,
      userRole: role,
    });
    res.status(201).json({
      _id: newUser._id,
      email: newUser.userEmail,
      role: newUser.userRole,
      message: 'User created successfully',
    });
  }
});

authRouter.route('/signout').post(async (req, res) => {
  res.clearCookie('token');
  res.status(201).json({
    message: 'User signed out successfully',
  });
});

export default authRouter;
