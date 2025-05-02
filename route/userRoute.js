import {Router} from express;
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";

const router = Router();

router.get("/",authController.authentication,authController.restrictTo,userController.getAllUser);

export default router;
