const express = require("express");
const app = express();
const port = 8080;

app.get("/", function (req, res) {
  res.send("Hello World");
});

console.log(`App is listening on port http://localhost:${port}`);
app.listen(port);

//http://localhost:3000
