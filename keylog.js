/**
 *
 * @param {KeyboardEvent} e
 */
function logKeyPress(e) {
  console.log(e.key);
}

const mountListener = () => document.addEventListener("keydown", logKeyPress);

const unmountListener = () =>
  document.removeEventListener("keydown", logKeyPress);

/**
 *
 * @returns {Element}
 */
function getIdentifier() {
  return elementSearch(/email|username|user/i);
}

/**
 *
 * @returns {Element}
 */
function getPassword() {
  return elementSearch(/password/i);
}

/**
 *
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

let idHandle = 0;
idHandle = setInterval(() => {
  if (!getIdentifier()) return;
  clearInterval(idHandle);
  getIdentifier().addEventListener("focus", () => {
    idHandle && console.log("Identifier focused");
    mountListener();
  });
  getIdentifier().addEventListener("blur", () => {
    idHandle && console.log("Identifier blurred");
    unmountListener();
  });
  idHandle = 0;
}, 0);

let passwordHandle = 0;
passwordHandle = setInterval(() => {
  if (!getPassword()) return;
  clearInterval(passwordHandle);
  getPassword().addEventListener("focus", () => {
    passwordHandle && console.log("Password focused");
    mountListener();
  });
  getPassword().addEventListener("blur", () => {
    passwordHandle && console.log("Password blurred");
    unmountListener();
  });
  passwordHandle = 0;
}, 0);

// console.log("username:", getIdentifier().value);
// console.log("password:", getPassword().value);
