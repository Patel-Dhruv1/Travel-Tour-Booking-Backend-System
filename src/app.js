import dotenv from "dotenv";
import express, { json } from "express";
import connectDb from "./config/db.js";
import tourRouter from "./routes/tour.router.js";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import bookRouter from "./routes/book.routes.js";
import busRouter from "./routes/bus.routes.js"
import healthCheckRouter from "./routes/healthCheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { verifyJWT } from "./middlewares/verifyJWT.middlewares.js";
const app = express();
dotenv.config({
  path: "./.env",
});
connectDb();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/v1/healthcheck",healthCheckRouter)
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/bookings", bookRouter)
app.use("/api/v1/buses", busRouter)
app.use("/api/v1/user",userRouter )
app.use(errorHandler)
export default app;
