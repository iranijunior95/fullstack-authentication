import mongoose from "mongoose";

export const Users = mongoose.model(
    'user',
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    })
);