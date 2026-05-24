import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return skills.map((skill) => skill.trim()).filter(Boolean);
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
  return undefined;
};

const publicUserFields = "-password";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select(publicUserFields)
    .populate("createdProjects", "title status requiredSkills")
    .populate("joinedProjects", "title status requiredSkills");

  res.json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const fields = ["name", "role", "bio", "github", "linkedin", "profilePicture", "resume", "lookingFor"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  });

  const skills = normalizeSkills(req.body.skills);
  if (skills) user.skills = skills;

  await user.save();

  const updatedUser = await User.findById(req.user._id)
    .select(publicUserFields)
    .populate("createdProjects", "title status requiredSkills")
    .populate("joinedProjects", "title status requiredSkills");

  res.json({ user: updatedUser });
});

export const discoverUsers = asyncHandler(async (req, res) => {
  const { role, lookingFor, skill, q } = req.query;
  const currentUser = await User.findById(req.user._id);
  const query = { _id: { $ne: req.user._id } };

  if (role) query.role = role;
  if (lookingFor) query.lookingFor = lookingFor;
  if (skill) query.skills = { $regex: skill, $options: "i" };
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { bio: { $regex: q, $options: "i" } },
      { skills: { $regex: q, $options: "i" } }
    ];
  }

  const users = await User.find(query).select(publicUserFields).limit(50);
  const mySkills = new Set((currentUser?.skills || []).map((skillName) => skillName.toLowerCase()));

  const ranked = users
    .map((user) => {
      const sharedSkills = user.skills.filter((skillName) => mySkills.has(skillName.toLowerCase()));
      const mentorBoost = currentUser?.role === "beginner" && user.role === "professional" ? 2 : 0;
      return {
        ...user.toObject(),
        matchScore: sharedSkills.length + mentorBoost,
        sharedSkills
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json({ users: ranked });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(publicUserFields);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ user });
});

export const uploadProfileAsset = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("File is required");
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    res.status(500);
    throw new Error("Cloudinary is not configured");
  }

  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  const resourceType = "auto";

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "devlink",
    resource_type: resourceType
  });

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
    resourceType
  });
});
