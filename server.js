const express = require("express");
const cors = require("cors");
const { Sequelize, DataType, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sequelize_upload", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

// attempt to connect to database and test credentials
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });
