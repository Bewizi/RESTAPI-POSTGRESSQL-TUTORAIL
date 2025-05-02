// import user from "../db/models/user";
import user from "../db/models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const generateToken = (payload) => {
  return jwt.sign(payload, "process.env.JWT_SECRET_KEY", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

class AuthConroller {
  signup = catchAsync(async (req, res, next) => {
    // res.status(200).json({
    //   status: "success",
    //   message: "Signup routes are working",
    // });
    try {
      console.log(req.body); // Debug incoming request body

      const body = req.body;

      // Validate required fields
      // if (!firstname || !lastname || !email || !password) {
      //   return res.status(400).json({
      //     status: "fail",
      //     message: "All fields are required",
      //   });
      // }

      if (!["1", "2"].includes(body.userType)) {
        return next(new AppError("Invaild user Type", 400));

        // return res.status(400).json({
        //   status: "fail",
        //   message: "Invalid user type",
        // });
      }

      const newUser = await user.create({
        userType: body.userType,
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
      });

      if (!newUser) {
        return next(new AppError("Failed to create user", 400));
      }

      const result = newUser.toJSON(); // Convert Sequelize instance to plain object

      delete result.password; // Remove password from the response
      delete result.deletedAt; // Remove deletedAt from the response

      result.token = generateToken({ id: result.id }); // Generate token for the user

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  });

  login = catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
      }

      const result = await user.findOne({
        where: {
          email,
        },
      });

      if (!result || (await bcrypt.compare(password, result.password))) {
        return next(new AppError("Invalid email or password", 401));
      }

      const token = generateToken({ id: result.id });

      return res.json({ status: "succees", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  });

  authentication = catchAsync(async (req, res, next) => {
    // 1. get the token from headers
    let idToken = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Bearer asfdasdfhjasdflkkasdf
      idToken = req.headers.authorization.split(" ")[1];
    }
    if (!idToken) {
      return next(new AppError("Please login to get access", 401));
    }
    // 2. token verification
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. get the user detail from db and add to req object
    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
      return next(new AppError("User no longer exists", 400));
    }
    req.user = freshUser;
    return next();
  });

  restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
      if (!userType.includes(req.user.userType)) {
        return next(
          new AppError("You don't have permission to perform this action", 403)
        );
      }
      return next();
    };

    return checkPermission;
  };
}

export default new AuthConroller();
