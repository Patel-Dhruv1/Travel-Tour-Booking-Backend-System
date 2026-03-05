import { Router } from "express";
import { bookTour, cancelBooking, getBookings } from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middlewares.js";
const router = Router()


router.route("/bookTour").post(verifyJWT, bookTour)
router.route("/:id").get(getBookings)
router.route("/cancelBooking/:id").post(cancelBooking)
export default router