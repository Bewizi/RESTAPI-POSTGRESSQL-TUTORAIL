import { Router } from "express";
import AppError from "../utils/appError.js";

const router = Router();

// router.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

export default router;
