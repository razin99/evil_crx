const express = require("express");
const app = express();
const port = 6900;

app.get("/", (req, res) => {
  res.send(JSON.stringify(req.query));
});

app.listen(port, () => {
  console.log(`Cookie logging listening at http://localhost:${port}`);
});
