import { Router } from "express";
import AuthController from "../controller/authController.js";

const routes = Router();

routes.post("/signup", AuthController.signup);
routes.post("/login", AuthController.login);

export default routes;
