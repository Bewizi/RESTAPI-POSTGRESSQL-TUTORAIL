import { Sequelize } from "sequelize";
import { findAndCountAll } from "../db/models/user";
import catchAsync from "../utils/catchAsync";

class UserController {
  getAllUser = catchAsync(async (req, res, next) => {
    const users = await findAndCountAll({
      where: {
        userType: {
          [Sequelize.Op.ne]: "0",
        },
      },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json({
      status: "success",
      data: users,
    });
  });
}

export default new UserController();
