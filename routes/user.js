import 'dotenv/config';
import { Router } from "express";
import { userModel } from "../db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const JWT_SECRET = process.env.JWT_SECRET_USER
export const userRouter = Router()

function auth(req, res, next){
    const token = req.headers.token
    const tokenDecoded = jwt.verify(token, JWT_SECRET)
    req.userId = tokenDecoded.userId
    next()
}

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
                   }, JWT_SECRET)
                   res.json({token: token})
               } else {
                   res.json({
                       message: "Incorrect Password!"
                   })
               }
           } catch( error ) {
           res.json({
               error: error
           })
    }
})

userRouter.get('/purchases', auth, (req, res)=>{
    res.json({
        message: "Get Purchaces endpoint"
    })
})