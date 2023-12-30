const Logger = require("./logger");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  Logger.setStatusCode(200).setDescription("OK").setTag("TEST").info();

  res.send("OK");
});

app.listen(3005, () => Logger.info("Server has been started on port:3005"));
