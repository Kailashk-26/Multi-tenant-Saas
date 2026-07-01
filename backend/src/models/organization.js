import mongoose from 'mongoose'

const organizationSchema=new mongoose.Schema({
    name:{
        type:string,
        required:true,
        unique:true,
        trim:true
    }
},{timestamps:true})

const Organization=mongoose.model('Organization',organizationSchema)

export default Organization