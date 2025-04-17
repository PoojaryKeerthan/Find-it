import express from "express";
import { Router } from "express";
import Getproducts from "../controllers/GetProductsController.js"

const router = Router();
router.get('/allLostproducts',Getproducts.getAllLostItems)
router.get('/allFoundproducts',Getproducts.getAllFoundItems)
router.get('/getitembyid/:id',Getproducts.getItemDetailsbyid)
router.get('/getitemsbyuserid/:id',Getproducts.getItemsBelongtouserId)
router.patch('/updateproduct/:id',Getproducts.updateProduct)
export default router;