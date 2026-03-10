
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken } from "../controllers/user.controller.js";
const router = Router();


router.
    route("/register").
    post(registerUser);

router.
    route("/login").
    post(loginUser);
//protected routes

router.
    route("/logout").
    post(verifyJWT, logoutUser);

router
    .route("/refresh-token")
    .post(refreshAccessToken)

router.get("/me", verifyJWT, getCurrentUser)


export default router;