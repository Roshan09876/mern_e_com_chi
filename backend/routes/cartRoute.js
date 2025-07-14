import express from "express";

import { addToCart, getCartDetails } from "../controllers/cartController.js";


const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/list/:userId", getCartDetails);

export default cartRouter;
