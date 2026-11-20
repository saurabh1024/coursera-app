import 'dotenv/config';
import express, { json, Router } from 'express'
import mongoose, { connect } from 'mongoose'
import cors from 'cors'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { userRouter, adminRouter, courseRouter } from './routes/index.js'
const app = express()
app.use(json())

const CONNECTION_STRING = process.env.CONNECTION_STRING
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT || 3000

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/course', courseRouter)

async function startServer(){
    try {
        await mongoose.connect(CONNECTION_STRING, {
            dbName: DB_NAME
        })
        console.log('Connected to MongoDB')
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error){
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}

startServer()