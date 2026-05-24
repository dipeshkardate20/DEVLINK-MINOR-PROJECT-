import asyncHandler from "express-async-handler";
import Project from "../models/Project.js";
import User from "../models/User.js";

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return skills.map((skill) => skill.trim()).filter(Boolean);
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
  return [];
};

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, requiredSkills, teamRequirements } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Title and description are required");
  }

  const project = await Project.create({
    title,
    description,
    requiredSkills: normalizeSkills(requiredSkills),
    teamRequirements,
    owner: req.user._id,
    members: [req.user._id]
  });

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { createdProjects: project._id, joinedProjects: project._id }
  });

  const populatedProject = await project.populate("owner members", "name role skills profilePicture");
  res.status(201).json({ project: populatedProject });
});

export const getProjects = asyncHandler(async (req, res) => {
  const { status, skill, q } = req.query;
  const query = {};

  if (status) query.status = status;
  if (skill) query.requiredSkills = { $regex: skill, $options: "i" };
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { requiredSkills: { $regex: q, $options: "i" } }
    ];
  }

  const projects = await Project.find(query)
    .populate("owner", "name role skills profilePicture")
    .populate("members", "name role skills profilePicture")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json({ projects });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "name role skills profilePicture")
    .populate("members", "name role skills profilePicture");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json({ project });
});

export const joinProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.members.some((memberId) => memberId.equals(req.user._id))) {
    res.status(409);
    throw new Error("You already joined this project");
  }

  project.members.push(req.user._id);
  await project.save();

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { joinedProjects: project._id }
  });

  const populatedProject = await project.populate("owner members", "name role skills profilePicture");
  res.json({ project: populatedProject });
});
