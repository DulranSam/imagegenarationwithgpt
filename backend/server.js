const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const main = require("./routes/main");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/main", main);

app.use("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Alert: "404 Error" }).status(404);
  } else {
    res.type("txt").send("404");
  }
});

async function start() {
  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
