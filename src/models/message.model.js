import mongoose from "mongoose";

const messageScheme = new mongoose.Schema({

    senderId: {
        type: String,
        required: true
    }, // Clerk User Id
    receiverId: {
        type: String,
        required: true
    },
    contentId: {
        type: String,
        required: true
    }, 

}, {timestamps:true});

export const Message = mongoose.model('Message', messageScheme)
