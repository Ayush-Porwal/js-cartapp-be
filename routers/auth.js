import crypto from "crypto";
import express from "express";
import jwt from "jsonwebtoken";

import Users from "../db/models/user.model.js";

const authRouter = express.Router();

authRouter.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const hashedPassword = crypto.scryptSync(
    password,
    process.env.CRYPTO_SECRET,
    64
  );

  if (user.userPassword !== hashedPassword.toString("hex")) {
    res.status(401).json({ message: "Incorrect password" });
    return;
  }

  const signinToken = jwt.sign(
    { _id: user._id, username: user.userName, email: user.userEmail },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", signinToken);

  res.json({
    _id: user._id,
    email: user.userEmail,
    message: "Signed in successfully",
  });
});

authRouter.route("/signup").post(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    res.status(200).json({ message: "User already exists" });
  } else {
    const hashedPassword = crypto.scryptSync(
      password,
      process.env.CRYPTO_SECRET,
      64
    );
    const newUser = await Users.create({
      userEmail: email,
      userName: username,
      userPassword: hashedPassword.toString("hex"),
    });
    res.status(201).json({
      _id: newUser._id,
      email: newUser.userEmail,
      message: "User created successfully",
    });
  }
});

export default authRouter;
