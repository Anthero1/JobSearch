const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
var { PythonShell } = require("python-shell");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded());
app.use(express.json());

let info = { main: "aa", location: "bb", range: "cc" };

app.post("/create", function (req, res) {
  info.main = req.body.data.main;
  info.location = req.body.data.location;
  info.range = req.body.data.location;
  var options = {
    args: [info.main, info.location, info.range],
  };
  console.log(options);
  PythonShell.run("./test.py", options, function (err, data) {
    if (data != null) {
      console.log(data.toString());
      if (err) res.send(err);
      res.json(data.toString());
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
