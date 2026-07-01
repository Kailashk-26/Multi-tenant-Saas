import mongoose from 'mongoose';

const featureFlagSchema = new mongoose.Schema({
    flag: {type: String,required: true,trim: true},
    description: {type: String,trim: true,default: ''},
    isEnabled: {type: Boolean,default: false},
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, 
{timestamps: true});

featureFlagSchema.index({ organizationId: 1,key : 1},{unique:true});

const FeatureFlag=mongoose.model('FeatureFlag',featureFlagSchema);

export default FeatureFlag;
