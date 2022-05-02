const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    mobileNo: {
        type: String,
        required: [true, "Contact number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
            productId: {
                type: String
            },
            productName: {
                type: String
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String
            },
            img: {
                type: String
            },
            purchasedOn: {
                type: Date,
				default: new Date()
            }
        },
    ]
});

module.exports = mongoose.model("User", userSchema);