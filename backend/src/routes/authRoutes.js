import express from "express";

import {
  register,
  login,
  logout,
  uploadProfileImage,

} from "../controllers/authController.js";

import upload from "../middleware/uploadMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);



router.post(
  "/upload-profile",
  authMiddleware,
  upload.single(
    "profileImage"
  ),
  uploadProfileImage
);

export default router;