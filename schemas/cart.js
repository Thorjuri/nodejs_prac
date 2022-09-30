const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model("cart", cartSchema);