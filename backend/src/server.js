import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'

const app=express()
const PORT=process.env.PORT || 3000;
app.use(express.json())

await connectDB()

app.listen(PORT,()=>{
    console.log("Server is running at",PORT)
})