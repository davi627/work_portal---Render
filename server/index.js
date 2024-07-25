import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { UserRouter } from './routes/user.js'
import { UserRouter2 } from './routes/user2.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { jobsRouter } from './routes/jobs.js'
import { applyRouter } from './routes/apply.js'
import { progressRouter } from './routes/progressRouter.js'


const app=express()

app.use(express.json())

app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true,
    optionsSuccessStatus:200,
    allowedHeaders:['Content-Type','Authorization']
}))

app.use(cookieParser())


app.use('/auth',UserRouter)
app.use('/auth',UserRouter2)
app.use('/jobs',jobsRouter)
app.use('/apply',applyRouter)
app.use('/progress',progressRouter)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Success db connection')
    app.listen(process.env.PORT,()=>{
        console.log(`server is running ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('error connecting to db: ' +err)
})




