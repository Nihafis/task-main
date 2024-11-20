import { Router } from "express";

import { login, signup, logout, loginWithGoogle } from "../controller/authController.js";
import verifyToken from "../util/verifiytoken.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/loginwithgoogle", loginWithGoogle);
authRoutes.post("/logout", verifyToken, logout);
export default authRoutes;
