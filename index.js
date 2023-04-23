const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/data");
const app = express();
const path=require("path");
const PORT=process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/data", dataRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
