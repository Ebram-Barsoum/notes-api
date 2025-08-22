import express from "express";

import validator from "../middlewares/validator.middleware.js";
import { loginSchema, signupSchema } from "../schemas/auth.schemas.js";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post('/login', validator(loginSchema), login);
router.post('/signup', validator(signupSchema), signup);

export default router;