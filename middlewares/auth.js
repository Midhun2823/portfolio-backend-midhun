import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated!", 400));
  }

  //We use decoded because if any other token is present it will given authentication to access it so we should not give for other token we should give only for authorised users only
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   above line means comapring the token which is genrated with the present JWT_SECRET_KEY or not

  req.user = await User.findById(decoded.id);
  next();
});
