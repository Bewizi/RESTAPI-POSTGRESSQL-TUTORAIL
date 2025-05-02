import express from "express";
import Authrouter from "./route/authRoute.js";
import dotenv from "dotenv";
import notFoundRoute from "./route/notFoundRoute.js";
import globalErrorHandler from "./controller/errorController.js";
import Projectrouter from "./route/projectRoute.js";

dotenv.config({ path: `${process.cwd()}/.env` });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL ROUTES
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/projects", Projectrouter);

// NOT FOUND ROUTE
// app.use(notFoundRoute);

// ERROR HANDLER
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
