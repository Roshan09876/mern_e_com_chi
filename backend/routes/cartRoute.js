import express from "express";

import { addToCart, getCartDetails, removeFromCart } from "../controllers/cartController.js";


const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/list/:userId", getCartDetails);
cartRouter.delete("/remove", removeFromCart);

export default cartRouter;
