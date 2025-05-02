import { Router } from "express";
import AuthController from "../controller/authController.js";
import projectController from "../controller/projectController.js";

const routes = Router();

routes.post(
  "/",
  AuthController.authentication,
  AuthController.restrictTo("1"),
  projectController.createProject
);

routes.get("/", AuthController.authentication, projectController.getAllProject);

// GET PROJECT BY ID
routes.get(
  "/:id",
  AuthController.authentication,
  AuthController.restrictTo("1"),
  projectController.getProjectById
);

// UPDATE PROJECT
routes.patch(
  "/:id",
  AuthController.authentication,
  AuthController.restrictTo("1"),
  projectController.updateProject
);

// DELETE PROJECT
routes.delete(
  "/:id",
  AuthController.authentication,
  AuthController.restrictTo("1"),
  projectController.deleteProject
);
// routes.post("/login", .login);

export default routes;
