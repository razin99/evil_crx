const express = require("express");
const app = express();
const port = 6900;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(JSON.stringify(req.query));
  console.log(req.query);
});

app.post("/", (req, res) => {
  res.send(JSON.stringify(req.body.data));
  let data = req.body.data[0]
  console.log(data.name, " :", data.value);
});

app.listen(port, () => {
  console.log(`Cookie logging listening at http://localhost:${port}`);
});
