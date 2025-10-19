import mongoose from "mongoose";

export const RequestsModel = new mongoose.Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    ordered_furniture: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "furniture"
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true })