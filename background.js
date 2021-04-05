setTimeout(() => {
    logCookie();
}, 5000);

chrome.cookies.onChanged.addListener(() => {
  logCookie();
});

function logCookie() {
  chrome.cookies.getAll({}, (r) => {
    console.log(r);
  });
}
