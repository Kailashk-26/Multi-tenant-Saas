import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import cors from 'cors'
import orgRouter from './routes/orgRoutes.js'
import authRouter from './routes/authRoutes.js'
import flagRouter from './routes/flagRoutes.js'

const app=express()
const PORT=process.env.PORT || 3000;
app.use(express.json())
app.use(cors())

await connectDB()


app.listen(PORT,()=>{
    console.log("Server is running at",PORT)
})
app.use('/api/org',orgRouter)
app.use('/api/users',authRouter)
app.use('/api/flags',flagRouter)