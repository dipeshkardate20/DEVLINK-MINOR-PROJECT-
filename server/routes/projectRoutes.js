import express from "express";
import { createProject, getProjectById, getProjects, joinProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createProject);
router.get("/all", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.post("/:id/join", protect, joinProject);

export default router;
