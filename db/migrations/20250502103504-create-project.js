"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("project", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
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
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("project");
}
