import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unqiue: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },

    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be 6 characters'],
        select: false
    },
     createdAt: {
        type: Date,
        default: Date.now
     }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;