const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded());
app.use(express.json());

let info = { main: "", keywd1: "", keywd2: "" };

app.post("/create", function (req, res) {
  info.main = req.body.data.main;
  console.log(info);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
