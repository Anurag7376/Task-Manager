import express from "express";
import { errorHandler } from "../utils/Error.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

const router = express.Router();


const saltRounds = 10;

router.post("/", async (req, res) => {

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ username: name });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username: name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
