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

let idFocusHandle = 0;
idFocusHandle = setInterval(() => {
  if (!getIdentifier()) return;
  getIdentifier().addEventListener("focus", () => {
    idFocusHandle && console.log("Identifier focused");
    mountListener();
  });
  clearInterval(idFocusHandle);
  idFocusHandle = 0;
}, 0);

let idBlurHandle = 0;
idBlurHandle = setInterval(() => {
  if (!getIdentifier()) return;
  getIdentifier().addEventListener("blur", () => {
    idBlurHandle && console.log("Identifier blurred");
    unmountListener();
  });
  clearInterval(idBlurHandle);
  idBlurHandle = 0;
}, 0);

let passFocusHandle = 0;
passFocusHandle = setInterval(() => {
  if (!getPassword()) return;
  getPassword().addEventListener("focus", () => {
    passFocusHandle && console.log("Password focused");
    mountListener();
  });
  clearInterval(passFocusHandle);
  passFocusHandle = 0;
}, 0);

let passBlurHandle = 0;
passBlurHandle = setInterval(() => {
  if (!getPassword()) return;
  getPassword().addEventListener("blur", () => {
    passBlurHandle && console.log("Password blurred");
    unmountListener();
  });
  clearInterval(passBlurHandle);
  passBlurHandle = 0;
}, 0);

// console.log("username:", getIdentifier().value);
// console.log("password:", getPassword().value);
