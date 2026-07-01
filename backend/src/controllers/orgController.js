import Organization from "../models/organization";

export const createOrg=async(req,res)=>{
    try{
        const {name}=req.body;
        const exOrg=await Organization.findOne({name});
        if (exOrg){
            return res.status(400).json({error:"Organization name already exists"});
        }
        const org=await Organization.create({name});
        return res.status(201).json({message:"Organization created"})
    }catch(err){
        res.status(500).json({error:err.message||"Error in creating organization"})
    }
}
export const deleteOrg=async(req,res)=>{
    try{
        const {id}=req.params;
        const org=await Organization.findByIdAndDelete(id);
        if (!org){
            return res.status(404).json({error:"Organization not found"});
        }
        return res.status(200).json({message:"Organization deleted"})
    }catch(err){
        res.status(500).json({error:err.message||"Error in deleting organization"})
    }
}
export const getAllOrg=async(req,res)=>{
    try{
        const orgs=await Organization.find();
        return res.status(200).json({organizations:orgs})
    }catch(err){
        res.status(500).json({error:err.message||"Error in fetching organizations"})
    }
}