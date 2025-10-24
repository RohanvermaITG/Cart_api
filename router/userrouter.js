import  {deleteUserByEmail, loginUser, logoutUser, registerUser}  from "../controller/Userconroller.js";
import express from "express";
const router = express.Router();

router.post("/register", registerUser);
router.post("/delete", deleteUserByEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;
