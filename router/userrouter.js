import  {deleteUserByEmail, loginUser, registerUser}  from "../controller/Userconroller.js";
import express from "express";
const router = express.Router();

router.post("/registert", registerUser);
router.post("/delete", deleteUserByEmail);
router.post("/login", loginUser);
export default router;
