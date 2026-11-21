import { Router } from "express";
import { userModel } from "../db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userAuth } from "../middlewares/user.js";
export const userRouter = Router()

userRouter.post('/signup', async (req, res)=>{
    const { email, password, firstName, lastName } = req.body
        const hashedPass = await bcrypt.hash(password, 5)
        const user = {
            email,
            password: hashedPass,
            firstName,
            lastName
        }
    
        try{
            await userModel.create(user)
            res.json({
                message: "User Signup endpoint"
            })
        } catch (error){
            res.json({
                error: error
            })
        }
})

userRouter.post('/signin', async (req, res)=>{
    const { email, password } = req.body
       try{
           const adminDetails = await userModel.findOne({
               email: email
           })
               const isMatch = await bcrypt.compare(password, adminDetails.password)
               if(isMatch){
                   const token = jwt.sign({
                       userId: adminDetails._userId
                   }, process.env.JWT_SECRET_USER)
                   res.json({token: token})
               } else {
                   throw new Error("Incorrect Password!")
               }
           } catch( error ) {
           res.json({
                message: "Something went wrong!",
                error: error
           })
    }
})

userRouter.get('/purchases', userAuth, (req, res)=>{
    res.json({
        message: "Get Purchaces endpoint"
    })
})