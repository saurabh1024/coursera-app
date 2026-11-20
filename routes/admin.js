import { Router } from "express";

export const adminRouter = Router()

adminRouter.post('/signup', (req, res)=>{
    res.json({
        message: "Admin Signup endpoint"
    })
})

adminRouter.post('/signin', (req, res)=>{
    res.json({
        message: "Admin Signin endpoint"
    })
})
