import express from 'express'
import { createFlag, deleteFlag, getFlagsByOrg, updateFlag } from '../controllers/featureFlagController'
import protect from '../middleware/auth'

flagRouter=express.Router()

flagRouter.get('/getflags/:organizationId',protect,getFlagsByOrg)
flagRouter.post('/createflag',protect,createFlag)
flagRouter.put('/updateflag/:id',protect,updateFlag)
flagRouter.delete('/deleteflag/:id',protect,deleteFlag)

export default flagRouter