import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        throw new ApiError(401, 'Unauthorized : No token Provided')
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        throw new ApiError(401, "Unauthorized : Invalid or Expired Token")
    }
})

export {verifyJWT}