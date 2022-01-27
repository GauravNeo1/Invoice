const mongoose = require('mongoose');
const invproductSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    invoiceno: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model("invoiceproduct", invproductSchema);