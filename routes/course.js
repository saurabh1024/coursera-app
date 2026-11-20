import { Router } from "express";

export const courseRouter = Router()

courseRouter.get("/preview", (req, res)=>{
    res.json({
        message: "get preview endpoint"
    })
})

courseRouter.post("/purchase", (req, res)=>{
    res.json({
        message: "create course endpoint"
    })
})