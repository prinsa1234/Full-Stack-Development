const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        shippingAddress: {
            fullName: String,
            address: String,
            city: String,
            state: String,
            zip: String,
            phone: String,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('User', userSchema);