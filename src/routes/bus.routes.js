import {Router} from 'express'
import { createBus, getBuses } from '../controllers/bus.controller.js'

const router = Router()

router.route("/add").post(createBus)
router.route("/getBuses").get(getBuses)
export default router