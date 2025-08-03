import express from "express"
import { registerUSer } from "../controller/user.controller.js";

const router=express.Router()

router.get("/register",registerUSer);

export default router;