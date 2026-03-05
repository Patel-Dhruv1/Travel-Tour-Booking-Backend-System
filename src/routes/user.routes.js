import {Router} from 'express'
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/verifyJWT.middlewares.js'
const router = Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router