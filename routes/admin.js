import 'dotenv/config';
import { Router } from "express";
import { adminModel } from "../db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const adminRouter = Router()
const JWT_SECRET = process.env.JWT_SECRET_ADMIN

function auth(req, res, next){
    const token = req.headers.token
    const tokenDecoded = jwt.verify(token, JWT_SECRET)
    req.userId = tokenDecoded.userId
    next()
}

adminRouter.post('/signup', async (req, res)=>{
    const { email, password, firstName, lastName } = req.body
    const hashedPass = await bcrypt.hash(password, 5)
    const user = {
        email,
        password: hashedPass,
        firstName,
        lastName
    }

    try{
        await adminModel.create(user)
        res.json({
            message: "Admin Signup endpoint"
        })
    } catch (error){
        res.json({
            error: error
        })
    }
})

adminRouter.post('/signin', async (req, res)=>{
    const { email, password } = req.body
    try{
        const adminDetails = await adminModel.findOne({
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
