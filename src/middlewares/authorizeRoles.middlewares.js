import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const authorizeRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req.user){
            throw new ApiError(401, "Unauthorized")
        }
        if(!allowedRoles.includes(req.user.role)){
            throw new ApiError(403, "Access Denied")
        }
        next();
    }
}

export {authorizeRole}