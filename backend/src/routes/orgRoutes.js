import express from 'express'
import { createOrg, deleteOrg, getAllOrg } from '../controllers/orgController'
import protect from '../middleware/auth'

const orgRouter=express.Router()

orgRouter.get('/getOrgs', getAllOrg)
orgRouter.post('/createOrg',protect,createOrg)
orgRouter.delete('/deleteOrg/:id',protect,deleteOrg)

export default orgRouter