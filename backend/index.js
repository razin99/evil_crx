const MAX_LEN = 10;
const cookieButton = document.getElementById("cookie-button");
const cookieInput = document.getElementById("cookie-input");
const cookieCheckButton = document.getElementById("cookie-check");
const cookieResult = document.getElementById("result");
const cookieClearButton = document.getElementById("cookie-clear");

let currentCookie;

// from: https://stackoverflow.com/a/1349426
function makeFlag() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < MAX_LEN; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  currentCookie = `FLAG{${result}}`;
  return currentCookie;
}

cookieButton.addEventListener("click", (event) => {
  event.preventDefault();
  Cookies.set("secret", makeFlag());
});

cookieCheckButton.addEventListener("click", (event) => {
  event.preventDefault();
  cookieResult.textContent =
    cookieInput.value === currentCookie ? "Correct!" : "Wrong :(";
});

cookieClearButton.addEventListener("click", (event) => {
    event.preventDefault();
    Cookies.remove("secret");
})