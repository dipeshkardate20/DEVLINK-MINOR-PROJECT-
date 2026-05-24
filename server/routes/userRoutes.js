import express from "express";
import { discoverUsers, getProfile, getUserById, updateProfile, uploadProfileAsset } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/upload", protect, upload.single("file"), uploadProfileAsset);
router.get("/discover", protect, discoverUsers);
router.get("/:id", protect, getUserById);

export default router;
