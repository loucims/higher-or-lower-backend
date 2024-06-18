import {Router} from "express";
import UserControllers from "../Controllers/UserControllers.js";

const userController = new UserControllers();

const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);

userRoutes.get("/:id", (req,res)=>{
    res.send("get user by id")
})

userRoutes.post("/", (req,res)=>{
    res.send("create user")
})

userRoutes.put("/:id", (req,res)=>{
    res.send("update user by id")
})

userRoutes.delete("/:id", (req,res)=>{
    res.send("delete user by id")
})

export default userRoutes;  