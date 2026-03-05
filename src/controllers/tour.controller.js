import { Tour } from "../models/tours.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Bus } from "../models/bus.models.js";
import { User } from "../models/user.models.js";
const createTour = asyncHandler(async (req, res) => {
  const availableBus = await Bus.findOneAndUpdate(
    { status: "Available" },
    {
      $set: {
        status: "Busy",
      },
    },
    { new: true },
  );
  if(availableBus == null){
    throw new ApiError(404, "No Bus Available")
  }
  let { places, startDate, endDate } = req.body;
  if (!Array.isArray(places) || places.length === 0) {
    throw new ApiError(400, "Invalid places");
  }

  if (
    !startDate ||
    !endDate 
    ) {
    throw new ApiError(400, "All fields are required !");
  }
  
  
    const newTour = await Tour.create({
      places: places,
      startDate: startDate,
      endDate: endDate,
      totalSeats: availableBus.capacity, 
      availableSeats: availableBus.capacity,
      busId : availableBus._id
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newTour,"Tour created Successfully."));
   
});

const getAllTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find();
  if (tours.length === 0) {
    throw new ApiError(400, "No tours found");
  }
  return res.status(200).json(new ApiResponse(200, tours));
});

const getOneTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findById(id);
  if (!tour) {
    throw new ApiError(404, "Tour not found");
  }
  return res.status(200).json(new ApiResponse(200, tour));
});

const endTour = asyncHandler(async(req,res)=>{
  const {tourId} = req.body
  const userId = req.user.userId
  if(!userId || !tourId){
    throw new ApiError(400, "All Fields Are Required")
  }
  const user =await User.findById(userId)
  if(!user){
    throw new ApiError(400, "User Does Not Exists")
  }
  if(user.role !== "manager"){
    throw new ApiError(403, "Access Denied")
  }
  const tour = await Tour.findById(tourId)
  if(!tour){
    throw new ApiError(400,"Tour Not Available")
  }
  const bus = await Bus.findOneAndUpdate({_id : tour.busId},
    {
      $set : {
        status : "Available"
      }
    },
  {new : true}
  )
  tour.status = "completed"
  tour.availableSeats = tour.totalSeats
  await tour.save()
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Tour ended successfully"));
},
)


export { getAllTours, getOneTour, createTour , endTour};
