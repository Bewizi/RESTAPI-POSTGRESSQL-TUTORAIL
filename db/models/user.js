"use strict";

import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import appError from "../../utils/appError.js";
import project from "./project.js";
const user = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userType: {
      type: DataTypes.ENUM(["0", "1", "2"]),
      allowNull: false,
      validate: {
        notNull: {
          msg: "userType cannot be null",
        },
        notEmpty: {
          msg: "userType cannot be empty",
        },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstname cannot be null",
        },
        notEmpty: {
          msg: "firstname cannot be empty",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastname cannot be null",
        },
        notEmpty: {
          msg: "lastname cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: {
          msg: "email cannot be empty",
        },
        isEmail: {
          msg: "Invalid email id",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          throw new appError("Password length must be greater than 7", 400);
        }
        if (value === this.password) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("confirmPassword", hashedPassword);
        } else {
          throw new Error("Password confirmation does not match password");
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "user",
    paranoid: true,
    freezeTableName: true,
  }
);

user.hasMany(project, { foreignKey: "createdBy" });
project.belongsTo(user, { foreignKey: "createdBy" });

export default user;
