import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['SUPER_ADMIN', 'ORG_ADMIN'], 
        default: 'ORG_ADMIN' 
    },
    organizationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Organization', 
        default: null 
    }
});

const User= mongoose.model('User', userSchema);

export default User;