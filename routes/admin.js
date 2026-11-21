import { Router } from "express";
import { adminModel, courseModel } from "../db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { adminAuth } from "../middlewares/admin.js";

export const adminRouter = Router()

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
        console.log(adminDetails)
            const isMatch = await bcrypt.compare(password, adminDetails.password)
            if(isMatch){
                const token = jwt.sign({
                    userId: adminDetails._id
                }, process.env.JWT_SECRET_ADMIN)
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

adminRouter.post("/course", adminAuth, async( req, res )=>{
    const creatorId = req.userId
    console.log(creatorId)
    const { title, description, imageUrl, price } = req.body
    try{
        await courseModel.insertOne({
            title,
            description,
            price,
            imageUrl,
            creatorId
        })
        res.json({
            message: "Created Course!"
        })
    } catch (error){
        res.json({
            message: "ERROR: Could not create course!",
            error: error
        })
    }
})

adminRouter.put("/course", adminAuth, async( req, res )=>{
    const creatorId = req.userId
    const { title, description, imageUrl, price, courseId } = req.body
    try{
        await courseModel.updateOne({
            creatorId: creatorId,
            courseId: courseId
        },{
            title,
            description,
            price,
            imageUrl,
            creatorId
        })
        res.json({
            message: "Course Updated!",
        })
    } catch (error){
        res.json({
            message: "ERROR: Could not create course!",
            error: error
        })
    }
})