const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const app = express();

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

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors("http://localhost:3000/"));

const Photo = sequelize.define("photos", {
  filename: {
    type: DataTypes.BLOB,
  },
});

app.get("/", (req, res) => {
  res.send("Works Lol");
});

app.get("/photos", (req, res) => {
  sequelize.sync().then(() => {
    Photo.findAll()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data ", error);
      });
  });
});

app.post("/upload", (req, res) => {
  sequelize.sync().then(() => {
    Photo.create({
      filename: req.body,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to upload file ", error);
      });
  });
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Application started on Port ${port}.`));
