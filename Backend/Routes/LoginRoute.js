import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/Error.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password || username === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ username });
    if (!validUser || validUser === null) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      id: validUser._id,
      username: validUser.username,
      message: "Login successful",
    });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
});

export default router;
