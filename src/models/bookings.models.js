import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        refer : "User",
        required : true
    },
    tourId : {
        type : Schema.Types.ObjectId,
        refer : "Tour",
        required : true
    },
    seatsBooked : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["CONFIRMED", "CANCELED"],
    },
    bookedAt : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    }
},{
    timestamps : true
})

export const Booking = mongoose.model("Booking", bookingSchema)