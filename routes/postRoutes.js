import {Router} from "express";

const postRoutes = Router();

postRoutes.get("/", (req,res)=>{
    res.send("get all posts")
})

postRoutes.get("/:id", (req,res)=>{
    res.send("get post by id")
})

postRoutes.post("/", (req,res)=>{
    res.send("create post")
})

postRoutes.put("/:id", (req,res)=>{
    res.send("update post by id")
})

postRoutes.delete("/:id", (req,res)=>{
    res.send("delete post by id")
})

export default postRoutes;  