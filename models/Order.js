const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: "pending"
    },
    total: {
        type: Number
    }
});

module.exports = mongoose.model("Cart", cartSchema);