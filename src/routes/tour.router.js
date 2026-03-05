import { Router } from "express";
import { createTour, endTour, getAllTours, getOneTour } from "../controllers/tour.controller.js";
import { authorizeRole } from "../middlewares/authorizeRoles.middlewares.js";
import { verifyJWT } from "../middlewares/verifyJWT.middlewares.js";

const router = Router()

router.route("/").post(createTour)
router.route("/").get(getAllTours)
router.route("/:id").get(getOneTour)
router.route("/endTour").post(verifyJWT,authorizeRole("manager")
,endTour)

export default router