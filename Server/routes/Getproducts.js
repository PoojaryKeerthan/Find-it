import express from "express";
import { Router } from "express";
import Getproducts from "../controllers/GetProductsController.js"

const router = Router();
router.get('/allLostproducts',Getproducts.getAllLostItems)
router.get('/allFoundproducts',Getproducts.getAllFoundItems)
export default router;