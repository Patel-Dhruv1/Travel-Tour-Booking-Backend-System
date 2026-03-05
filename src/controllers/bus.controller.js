import { Bus } from "../models/bus.models.js";
import { Tour } from "../models/tours.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBus = asyncHandler(async (req,res) => {
    const {vehicleNo, busType, capacity} = req.body
    if(!vehicleNo || !busType || !capacity ||  capacity < 12){
        throw new ApiError(400, "All Fields Are Required")
    }
   
    let busStatus = "Available"

    const newBus = await Bus.create({
        vehicleNo,
        busType,
        capacity,
        status : busStatus,
    })

    return res.status(200).json(new ApiResponse(200,newBus,"Bus added successfully."))
})

const getBuses = asyncHandler(async(req,res)=>{
    const buses =await  Bus.find()
    if(buses.length === 0){
        throw new ApiError(404, "No Bus Found.")
    }
    return res.status(200).json(new ApiResponse(200,buses))
})

export {createBus, getBuses}