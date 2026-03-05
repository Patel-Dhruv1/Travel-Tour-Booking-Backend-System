import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const registerUser = asyncHandler(async(req,res)=>{
  const { username, email, address, password } = req.body;
  if ([username, email, address, password].some((v) => !v)) {
    throw new ApiError(400, "All fields are required");
  }
/*Username: Allows letters, numbers, and ._%+- characters.
Domain: Allows letters, numbers, and hyphens.
TLD: Requires at least 2 alphabetic characters (e.g., .com, .uk, .online). */

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    throw new ApiError(400, "Valid email format is required");
  }
  //at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passPattern.test(password)) {
    throw new ApiError(400, "Valid password format is required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const registerUserData = await User.create({
    name: username,
    email,
    address,
    password: hashedPassword,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, {user : {
        username : username,
        email : email,
        address : address
    }}, "successfull."));
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new ApiError(400,"All fields are requried")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(401, "Invalid Credentials")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid Credentials")
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
     user.refreshToken = refreshToken;
     await user.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(200,{accessToken,refreshToken, user : {
        userId : user._id,
        name : user.name,
        email : user.email,
        role : user.role
    }}, "Successfull."))
})

const generateAccessToken = (user)=>{
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
}

const generateRefreshToken = (user)=>{
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh token invalid");
  }

  const newAccessToken = generateAccessToken(user);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken: newAccessToken },
        "Access token refreshed",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  await User.findByIdAndUpdate(userId, {
    $set: { refreshToken: "" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
export {registerUser, loginUser, logoutUser,refreshAccessToken}