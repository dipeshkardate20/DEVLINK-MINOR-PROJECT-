import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  bio: user.bio,
  skills: user.skills,
  github: user.github,
  linkedin: user.linkedin,
  profilePicture: user.profilePicture,
  resume: user.resume,
  lookingFor: user.lookingFor,
  createdProjects: user.createdProjects,
  joinedProjects: user.joinedProjects,
  connections: user.connections
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("Email is already registered");
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    user: userResponse(user),
    token: generateToken(user._id)
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      user: userResponse(user),
      token: generateToken(user._id)
    });
    return;
  }

  res.status(401);
  throw new Error("Invalid email or password");
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: userResponse(req.user) });
});
