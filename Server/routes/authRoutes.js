import express from "express";
import { Router } from "express";

import authController from "../controllers/authController.js"

const router = Router();
router.post('/register',authController.signup)
router.post('/login',authController.login)
router.get('/logout',authController.logout)
export default router;
