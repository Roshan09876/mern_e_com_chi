import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/profile/:id", getProfile);

export default userRouter;
