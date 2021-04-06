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
  req.body.data.forEach(cookie => {
    console.log(cookie.name, " :", cookie.value);
  });
});

app.listen(port, () => {
  console.log(`Cookie logging listening at http://localhost:${port}`);
});
