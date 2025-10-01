import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ["INR", "USD"]
    },
    status: {
        type: String,
        required: true,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING"
    },
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
})


const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;




