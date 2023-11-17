const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const main = require("./routes/main");

app.use(cors());
app.use(express.json());
app.use("/main", main);

async function start() {
  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
