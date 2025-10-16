import express from "express";
import { addcartiitems, getCartItems, removeProductFromCart } from "../controller/Cartcontroller.js"; 

const router = express.Router();
router.get("/cart", getCartItems);
router.post("/addproduct", addcartiitems);
router.post("/remove", removeProductFromCart);

export default router;
