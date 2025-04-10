import express from "express";
import { Router } from "express";
import multer from "multer";

import ProductController from "../controllers/ProductsController.js"

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();
router.post('/found-products',upload.single('Image'),ProductController.foundproducts)
router.post('/lost-products',upload.single('Image'),ProductController.lostproducts)

export default router;

