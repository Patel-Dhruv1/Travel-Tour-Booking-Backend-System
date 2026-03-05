import { asyncHandler } from "../utils/asyncHandler.js";
import { Tour } from "../models/tours.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Booking } from "../models/bookings.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookTour = asyncHandler(async (req, res) => {
  const {  tourId, seats } = req.body;
  const userId = req.user.userId
  if (!userId || !tourId || !seats || seats <= 0) {
    throw new ApiError(400, "Invalid booking data");
  }
  
  const tour = await Tour.findOneAndUpdate(
    { _id: tourId, availableSeats: { $gte: seats } },
    { $inc: { availableSeats: -seats } },
    { new: true },
  );
  if (!tour) {
    throw new ApiError(404, "tour or seats are not available ");
  }

  const bookingData = await Booking.create({
    userId,
    tourId,
    seatsBooked: seats,
    status: "CONFIRMED",
    bookedAt: new Date(),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, bookingData, "booking successfull."));
});

const getBookings = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const bookings = await Booking.find({ tourId: id })
    .populate("userId", "name email")
    .populate("tourId", "places startDate endDate");
  if (bookings.length === 0) {
    throw new ApiError(404, "No bookings Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "booking retrived successfully."));
});

const cancelBooking = asyncHandler(async (req, res) => {
  const id  = req.params.id;

  const booking = await Booking.findById(id).populate("tourId");
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.status === "CANCELED") {
    throw new ApiError(400, "Booking already cancelled");
  }

  if (booking.tourId.status === "COMPLETED") {
    throw new ApiError(400, "Tour already completed");
  }

  await Tour.findOneAndUpdate(
    {
      _id: booking.tourId._id,
    },
    {
      $inc: { availableSeats: -booking.seatsBooked },
    },
  );

  booking.status = "CANCELED";
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled Successfully."));
});

export { bookTour, getBookings, cancelBooking };
