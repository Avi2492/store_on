import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res) {
  const { email, password, username } = req.body;

  try {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User Created Success!",
      user: {
        ...newUser._doc,
        password: undefined,
      },
      role: newUser.role,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    generateTokenAndSetCookie(res, user._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Login Success!",
      user: {
        ...user._doc,
        password: undefined,
      },
      role: user.role,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout Success" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function authCheck(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
