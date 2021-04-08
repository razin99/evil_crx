/**
 * logs keypress
 * @param {KeyboardEvent} e
 */
function logKeyPress(e) {
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
  if (!getIdentifier()) return;
  getIdentifier().addEventListener("focus", () => {
    idHandle && console.log("Identifier focused");
    mountListener();
  });
  getIdentifier().addEventListener("blur", () => {
    idHandle && console.log("Identifier blurred");
    unmountListener();
  });
  clearInterval(idHandle);
  idHandle = 0;
}, 0);

// force mount password field event handler
let passHandle = 0;
passHandle = setInterval(() => {
  if (!getPassword()) return;
  getPassword().addEventListener("focus", () => {
    passHandle && console.log("Password focused");
    mountListener();
  });
  getPassword().addEventListener("blur", () => {
    passHandle && console.log("Password blurred");
    unmountListener();
  });
  clearInterval(passHandle);
  passHandle = 0;
}, 0);

// console.log("username:", getIdentifier().value);
// console.log("password:", getPassword().value);
