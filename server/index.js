const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

//Rotas
const ClientRoutes = require("./routes/clientRoutes");
app.use("/clients", ClientRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@clients.fmclpfi.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
