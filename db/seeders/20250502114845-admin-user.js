"use strict";

import bcrypt from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert("user", [
      {
        userType: "0",
        firstname: "John",
        lastname: "Doe",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", { userType: "1" }, {});
  },
};
