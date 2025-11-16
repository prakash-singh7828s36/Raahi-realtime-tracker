
import express from "express";
import { registerUser,loginUser, me } from "../controllers/auth.controller.js";

const Router = express.Router();

// Register route
Router.post("/register",registerUser);

// Login route
Router.post("/login", loginUser);

Router.get("/me",me)


export default Router;