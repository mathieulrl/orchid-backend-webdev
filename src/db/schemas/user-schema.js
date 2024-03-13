import mongoose, { Schema } from 'mongoose'


const User = new Schema ({
    username: { 
        type: String,
        required: true,
        unique: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true
    }, 
    password: { 
        type: String,
        required: true
    }
})

User.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

export default mongoose.model('User', User)